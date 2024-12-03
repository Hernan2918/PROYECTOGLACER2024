from flask import Blueprint, current_app
from app.models import Producto, Proveedor, Categoria, Usuario, db, Muro, Adhesivo, Sanitario, Tinaco, Vitroblock
from werkzeug.security import check_password_hash, generate_password_hash
from flask import request, session, redirect, url_for, render_template, flash, make_response
from app import db
from flask import jsonify
from werkzeug.utils import secure_filename
import os
from fpdf import FPDF
from io import BytesIO
from functools import wraps



apps = Blueprint('main', __name__)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logeado' not in session:
            return redirect(url_for('main.home'))
        return f(*args, **kwargs)
    return decorated_function

def no_cache(view):
    @wraps(view)
    def no_cache_view(*args, **kwargs):
        response = make_response(view(*args, **kwargs))
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
        return response
    return no_cache_view



@apps.route('/')
def home():
    return render_template('login.html')



@apps.route('/acceso', methods=["GET", "POST"])

def acceso():
    if request.method == 'POST' and 'txtusuario' in request.form and 'txtcontrasena' in request.form:
        usuario = request.form['txtusuario']
        contrasena = request.form['txtcontrasena']
        

        acceder = Usuario.query.filter_by(usuario=usuario).first()

        print(f"Usuario encontrado: {acceder}") 
        
        if acceder:
            print(f"Contraseña ingresada: {contrasena}") 
            print(f"Hash de la contraseña: {acceder.contrasena}") 

            if check_password_hash(acceder.contrasena, contrasena):
                session['logeado'] = True
                session['id_usuario'] = acceder.id_usuario
                session['usuario'] = acceder.usuario
                session['nombre'] = acceder.nombre
                session['privilegio'] = acceder.privilegio
                

                return redirect(url_for('main.consulta_productos'))
            else:
                return render_template('login.html', mensaje='Usuario o contraseña incorrectos.')
        else:
            return render_template('login.html', mensaje='Usuario o contraseña incorrectos.')
    
    return redirect('/')








@apps.route('/consulta_usuarios')
@login_required
@no_cache
def consulta_usuarios():
    usuarios = Usuario.query.all()
    return render_template('/usuarios/usuarios.html', usuarios=usuarios)

@apps.route('/registro_usuariosModal', methods=['POST'])
def registro_usuariosModal():
    if request.method == 'POST':
        try:
            nombre = request.form['registarnombre']
            apellidos = request.form['registrarapellido']
            genero = request.form['registrargenero']
            privilegio = request.form['registrarprivilegio']
            usuario = request.form['registrarusuario']
            contrasena = request.form['registrarcontraseña']
            
            hashed_contrasena = generate_password_hash(contrasena)
            print(f"Hash almacenado: {hashed_contrasena}")  
            
            nuevo_usuario = Usuario(
                nombre=nombre,
                apellidos=apellidos,
                genero=genero,
                privilegio=privilegio,
                usuario=usuario,
                contrasena=hashed_contrasena
            )
            
            db.session.add(nuevo_usuario)
            db.session.commit()

            flash('Usuario registrado exitosamente!', 'success')
            return redirect(url_for('main.consulta_usuarios'))
        
        except Exception as e:
            db.session.rollback()  
            flash(f"Error al registrar el usuario: {str(e)}", 'danger')
            return redirect('/registro')
    
    return redirect(url_for('main.consulta_usuarios'))


@apps.route('/eliminar_usuario/<int:usuario_id>', methods=['POST'])
def eliminar_usuario(usuario_id):
    if request.method == 'POST':
        usuario = Usuario.query.get(usuario_id)

        if usuario:
            db.session.delete(usuario)
            db.session.commit()
            flash('Usuario eliminado correctamente!', 'error')
        else:
            flash('Usuario no encontrado.', 'danger')
    
    return redirect(url_for('main.consulta_usuarios'))


@apps.route('/salidas')
@login_required
@no_cache
def salidas():
    return render_template('/salidas/salidas.html')


@apps.route('/entradas')
@login_required
@no_cache
def entradas():
    return render_template('/entradas/entradas.html')



@apps.route('/consulta_productos')
@login_required
@no_cache
def consulta_productos():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 6, type=int)
    search_term = request.args.get('search', '', type=str).strip()

    productos_query = Producto.query \
        .join(Proveedor, Producto.proveedor == Proveedor.id_proveedor) \
        .join(Categoria, Producto.categoria == Categoria.id_categoria) \
        .add_columns(
            Producto.id_producto,
            Producto.medidas,
            Producto.producto,
            Producto.calidad,
            Producto.existencias,
            Producto.rotas,
            Producto.precio,
            Producto.embalaje,
            Producto.ubicacion,
            Proveedor.nombre.label('proveedor_nombre'), Proveedor.id_proveedor,
            Categoria.nombre.label('categoria_nombre'), Categoria.id_categoria
        )

    if search_term:
        productos_query = productos_query.filter(
            db.or_(
                Producto.medidas.ilike(f"%{search_term}%"),
                Proveedor.nombre.ilike(f"%{search_term}%"),
                Producto.producto.ilike(f"%{search_term}%"),
                Producto.existencias.ilike(f"%{search_term}%"),
                Producto.embalaje.ilike(f"%{search_term}%"),
                Producto.precio.ilike(f"%{search_term}%"),
                Producto.rotas.ilike(f"%{search_term}%"),
                Producto.calidad.ilike(f"%{search_term}%"),
                Categoria.nombre.ilike(f"%{search_term}%")
            )
        )

    productos_paginados = productos_query.paginate(page=page, per_page=per_page, error_out=False)

    proveedores = Proveedor.query.all()
    categorias = Categoria.query.all()

    return render_template(
        '/productos/productos.html',
        productos=productos_paginados.items, max=max, min=min,  
        proveedores=proveedores,
        categorias=categorias,
        pagination=productos_paginados,  
        search=search_term  
    )






@apps.route('/obtener_todos_productos')

def obtener_todos_productos():
    
    productos = Producto.query.join(Proveedor, Producto.proveedor == Proveedor.id_proveedor) \
                              .join(Categoria, Producto.categoria == Categoria.id_categoria) \
                              .add_columns(Producto.medidas, Producto.producto, Producto.calidad, 
                                           Producto.existencias, Producto.rotas, Producto.precio, 
                                           Producto.embalaje, Producto.ubicacion, 
                                           Proveedor.nombre.label('proveedor_nombre'),
                                           Categoria.nombre.label('categoria_nombre')) \
                              .all()

    productos_json = [
        {
            'medidas': p.medidas,
            'proveedor_nombre': p.proveedor_nombre,
            'producto': p.producto,
            'calidad': p.calidad,
            'existencias': p.existencias,
            'rotas': p.rotas,
            'precio': p.precio,
            'embalaje': p.embalaje,
            'ubicacion': p.ubicacion,
            'categoria_nombre': p.categoria_nombre
        }
        for p in productos
    ]

    return jsonify(productos_json)


@apps.route('/registro_productos', methods=['POST'])

def registro_productos():
    if request.method == 'POST':
        medida = request.form['medida']
        proveedor_id = request.form['proveedores']
        producto = request.form['producto']
        calidad = request.form['calidad']
        existencias = request.form['existencia']
        rotas = request.form['rotas']
        precio = request.form['precio']
        embalaje = request.form['embalaje']
        ubicacion = request.form['ubicacion']
        categoria_id = request.form['categorias']
        
        nuevo_producto = Producto(
            medidas=medida,
            proveedor=proveedor_id,
            producto=producto,
            calidad=calidad,
            existencias=existencias,
            rotas=rotas,
            precio=precio,
            embalaje=embalaje,
            ubicacion=ubicacion,
            categoria=categoria_id
        )

        db.session.add(nuevo_producto)
        db.session.commit()

        flash('Producto registrado exitosamente!', 'success')
        return redirect(url_for('main.consulta_productos'))
    


@apps.route('/actualizar_producto', methods=['POST'])
def actualizar_producto():
    if request.method == 'POST':
        id_producto = request.form['id_producto']
        medida = request.form['medidaeditar']
        proveedor_id = request.form['proveedoreditar']
        producto = request.form['productoeditar']
        calidad = request.form['calidadeditar']
        existencia = request.form['existenciaeditar']
        rotas = request.form['rotaseditar']
        precio = request.form['precioeditar']
        embalaje = request.form['embalajeeditar']
        ubicacion = request.form['ubicacioneditar']
        categoria_id = request.form['categoriaeditar']

        producto_a_actualizar = Producto.query.get(id_producto)
        
        if producto_a_actualizar:
            producto_a_actualizar.medidas = medida
            producto_a_actualizar.proveedor = proveedor_id
            producto_a_actualizar.producto = producto
            producto_a_actualizar.calidad = calidad
            producto_a_actualizar.existencias = existencia
            producto_a_actualizar.rotas = rotas
            producto_a_actualizar.precio = precio
            producto_a_actualizar.embalaje = embalaje
            producto_a_actualizar.ubicacion = ubicacion
            producto_a_actualizar.categoria = categoria_id

            db.session.commit()

            flash('Producto actualizado exitosamente!', 'info')
            return redirect(url_for('main.consulta_productos'))

        else:
            flash('Producto no encontrado.', 'danger')
            return redirect(url_for('main.consulta_productos'))



@apps.route('/eliminar_producto/<int:producto_id>', methods=['POST'])
def eliminar_producto(producto_id):
    if request.method == 'POST':
        producto = Producto.query.get(producto_id)

        if producto:
            db.session.delete(producto)
            db.session.commit()
            flash('Producto eliminado correctamente!', 'error')
        else:
            flash('Producto no encontrado.', 'danger')
    
    return redirect(url_for('main.consulta_productos'))




@apps.route('/consulta_proveedores')
@login_required
@no_cache
def consulta_proveedores():
    page = request.args.get('page', 1, type=int)  
    per_page = request.args.get('per_page', 6, type=int) 
    search = request.args.get('search', '', type=str) 

    proveedores_query = Proveedor.query.add_columns(
        Proveedor.id_proveedor,
        Proveedor.nombre,
        Proveedor.telefono,
        Proveedor.correo,
        Proveedor.direccion,
        Proveedor.foto
    )

    if search:
        proveedores_query = proveedores_query.filter(
            Proveedor.nombre.ilike(f"%{search}%") |
            Proveedor.telefono.ilike(f"%{search}%") |
            Proveedor.correo.ilike(f"%{search}%") |
            Proveedor.direccion.ilike(f"%{search}%")
        )

    
    proveedores_paginated = proveedores_query.paginate(page=page, per_page=per_page, error_out=False)

    return render_template(
        '/proveedores/proveedores.html',
        proveedores=proveedores_paginated.items,
        pagination=proveedores_paginated,
        search=search  
    )






@apps.route('/registro_proveedor', methods=['POST'])
def registro_proveedor():
    if request.method == 'POST':
        nombre = request.form['nombre']
        telefono = request.form['telefono']
        correo = request.form['correo']
        direccion = request.form['direccion']
        
        foto_db = None
        if 'foto' in request.files:
            foto = request.files['foto']
            if foto.filename != '':
                filename = secure_filename(foto.filename)
                foto_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                foto.save(foto_path)
                foto_db = filename

        try:
            nuevo_proveedor = Proveedor(
                nombre=nombre,
                telefono=telefono,
                correo=correo,
                direccion=direccion,
                foto=foto_db
            )
            db.session.add(nuevo_proveedor)
            db.session.commit()

            flash('Proveedor registrado exitosamente!', 'success')
            return redirect(url_for('main.consulta_proveedores'))
        except Exception as e:
            db.session.rollback()
            flash(f"Error al registrar proveedor: {str(e)}", 'danger')
            return redirect(url_for('main.consulta_proveedores'))


@apps.route('/actualizar_proveedor', methods=['POST'])
def actualizar_proveedor():
    if request.method == 'POST':
        id_proveedor = request.form['id_proveedor']
        nombre = request.form['nombreeditar']
        telefono = request.form['telefonoeditar']
        correo = request.form['correoeditar']
        direccion = request.form['direccioneditar']

        proveedor = Proveedor.query.get(id_proveedor)
        if not proveedor:
            flash('Proveedor no encontrado', 'error')
            return redirect(url_for('main.consulta_proveedores'))

        if 'fotoeditar' in request.files and request.files['fotoeditar'].filename != '':
            foto = request.files['fotoeditar']
            filename = secure_filename(foto.filename)
            upload_folder = current_app.config['UPLOAD_FOLDER']
            new_file_path = os.path.join(upload_folder, filename)

            try:
                foto.save(new_file_path)  
                proveedor.foto = filename  
            except Exception as e:
                flash(f'Error al guardar la nueva foto: {e}', 'error')
                return redirect(url_for('main.consulta_proveedores'))

        proveedor.nombre = nombre
        proveedor.telefono = telefono
        proveedor.correo = correo
        proveedor.direccion = direccion

        try:
            db.session.commit()  
            flash('Proveedor actualizado exitosamente!', 'info')
        except Exception as e:
            db.session.rollback()
            flash(f'Error al actualizar el proveedor: {e}', 'error')

        return redirect(url_for('main.consulta_proveedores'))
    

@apps.route('/eliminar_proveedor/<int:proveedor_id>', methods=['POST'])
def eliminar_proveedor(proveedor_id):
    try:
        proveedor = Proveedor.query.get(proveedor_id)
        
        if not proveedor:
            flash('Proveedor no encontrado', 'error')
            return redirect(url_for('main.consulta_proveedores'))

        db.session.delete(proveedor)
        db.session.commit()

        flash('Proveedor eliminado correctamente!', 'error')
    except Exception as e:
        db.session.rollback()
        flash(f'Error al eliminar el proveedor: {e}', 'error')
    
    return redirect(url_for('main.consulta_proveedores'))

@apps.route('/consulta_categorias')
@login_required
@no_cache
def consulta_categorias():
   
    page = request.args.get('page', 1, type=int)  
    per_page = request.args.get('per_page', 6, type=int)  
    search = request.args.get('search', '', type=str) 

    categorias_query = Categoria.query

    if search:
        categorias_query = categorias_query.filter(
            Categoria.nombre.ilike(f"%{search}%")
            )

    categorias_paginated = categorias_query.paginate(page=page, per_page=per_page, error_out=False)

    return render_template(
        '/categorias/categorias.html',
        categorias=categorias_paginated.items,
        pagination=categorias_paginated,
        search=search  
    )



@apps.route('/registro_categorias', methods=['POST'])
def registro_categorias():
    if request.method == 'POST':
        nombre = request.form['nombre']
        descripcion = request.form['descripcion']

        try:
            nueva_categoria = Categoria(nombre=nombre, descripcion=descripcion)

            db.session.add(nueva_categoria)
            db.session.commit()

            flash('Categoría registrada exitosamente!', 'success')
        except Exception as e:
            db.session.rollback()  
            flash(f'Error al registrar la categoría: {e}', 'error')

        return redirect(url_for('main.consulta_categorias'))
    

@apps.route('/actualizar_categoria', methods=['POST'])
def actualizar_categoria():
    if request.method == 'POST':
        id_categoria = request.form['id_categoria']
        nombre = request.form['nombreeditar']
        descripcion = request.form['descripcioneditar']

        try:
            categoria = Categoria.query.get(id_categoria)
            
            if not categoria:
                flash('Categoría no encontrada.', 'error')
                return redirect(url_for('main.consulta_categorias'))

            categoria.nombre = nombre
            categoria.descripcion = descripcion

            db.session.commit()
            flash('Categoría actualizada exitosamente!', 'info')
        except Exception as e:
            db.session.rollback()  
            flash(f'Error al actualizar la categoría: {e}', 'error')

        return redirect(url_for('main.consulta_categorias'))


@apps.route('/eliminar_categoria/<int:categoria_id>', methods=['POST'])
def eliminar_categoria(categoria_id):
    try:
        categoria = Categoria.query.get(categoria_id)

        if not categoria:
            flash('Categoría no encontrada.', 'error')
            return redirect(url_for('main.consulta_categorias'))
        
        db.session.delete(categoria)
        db.session.commit()

        flash('Categoría eliminada correctamente!', 'success')
    except Exception as e:
        db.session.rollback()  
        flash(f'Error al eliminar la categoría: {e}', 'error')

    return redirect(url_for('main.consulta_categorias'))


@apps.route('/consulta_muros')
@login_required
@no_cache
def consulta_muros():
    page = request.args.get('page', 1, type=int)  
    per_page = request.args.get('per_page', 6, type=int)  
    search_term = request.args.get('search', '', type=str)  

    query = Muro.query.join(Proveedor, Muro.proveedor == Proveedor.id_proveedor) \
                      .join(Categoria, Muro.categoria == Categoria.id_categoria) \
                      .add_columns(
                          Muro.id_producto, Muro.medidas, Muro.producto, Muro.calidad,
                          Muro.existencias, Muro.rotas, Muro.precio, Muro.embalaje,
                          Muro.ubicacion, Proveedor.nombre.label('proveedor_nombre'),
                          Categoria.nombre.label('categoria_nombre')
                      )

    if search_term:
        query = query.filter(
            Muro.medidas.ilike(f'%{search_term}%') | 
            Muro.producto.ilike(f'%{search_term}%') | 
            Muro.calidad.ilike(f'%{search_term}%') | 
            Muro.existencias.ilike(f'%{search_term}%') |
            Muro.rotas.ilike(f'%{search_term}%') |
            Muro.precio.ilike(f'%{search_term}%') | 
            Muro.embalaje.ilike(f'%{search_term}%') | 
            Muro.ubicacion.ilike(f'%{search_term}%') | 
            Proveedor.nombre.ilike(f'%{search_term}%') |  
            Categoria.nombre.ilike(f'%{search_term}%')   
        )

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    muros = pagination.items

    proveedores = Proveedor.query.all()
    categorias = Categoria.query.all()

    return render_template(
        '/muros/muros.html',
        muros=muros, max=max, min=min,
        proveedores=proveedores,
        categorias=categorias,
        pagination=pagination,
        search_term=search_term
    )




@apps.route('/obtener_todos_muros')
@login_required
def obtener_todos_muros():
    
    muros = Muro.query.join(Proveedor).join(Categoria).add_columns(
        Muro.id_producto, 
        Muro.medidas, 
        Muro.producto, 
        Muro.calidad, 
        Muro.existencias, 
        Muro.rotas, 
        Muro.precio, 
        Muro.embalaje, 
        Muro.ubicacion,
        Proveedor.nombre.label('proveedor_nombre'),
        Proveedor.id_proveedor.label('proveedor_id'),
        Categoria.nombre.label('categoria_nombre'),
        Categoria.id_categoria.label('categoria_id')
    ).all()

    # Convertir el resultado a un formato JSON serializable
    muros_json = [
        {
            "id_producto": m.id_producto,
            "medidas": m.medidas,
            "producto": m.producto,
            "calidad": m.calidad,
            "existencias": m.existencias,
            "rotas": m.rotas,
            "precio": m.precio,
            "embalaje": m.embalaje,
            "ubicacion": m.ubicacion,
            "proveedor_nombre": m.proveedor_nombre,
            "proveedor_id": m.proveedor_id,
            "categoria_nombre": m.categoria_nombre,
            "categoria_id": m.categoria_id
        } for m in muros
    ]

    return jsonify(muros_json)



@apps.route('/descargar_etiqueta_muro/<int:muro_id>')
def descargar_etiqueta_muro(muro_id):
    muro = Muro.query.get_or_404(muro_id)
    proveedor = Proveedor.query.get(muro.proveedor)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_line_width(1)
    pdf.rect(10, 10, 90, 50)

    nombre_imagen = proveedor.foto
    ruta_imagen = os.path.join(os.getcwd(), 'app', 'static', 'uploads', nombre_imagen)

    if os.path.exists(ruta_imagen):
        pdf.image(ruta_imagen, x=11, y=11, w=30)
    else:
        print(f"La imagen no se encuentra en la ruta especificada: {ruta_imagen}")
        pdf.set_font("Arial", size=10)
        pdf.set_xy(11, 11)
        pdf.cell(30, 10, "Imagen no disponible", border=1, align="C")

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(75, 15)
    pdf.cell(0, 10, txt=f"{muro.medidas}")
    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(10, 30)
    pdf.cell(90, 10, txt=muro.producto.upper(), align="C")
    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(78, 48)
    pdf.cell(0, 10, txt=f"${muro.precio}")
    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(15, 48)
    pdf.cell(0, 10, txt=f"{muro.embalaje}")

    output_pdf = BytesIO()
    pdf.output(output_pdf)
    output_pdf.seek(0)

    response = make_response(output_pdf.read())
    response.headers["Content-Disposition"] = f"attachment; filename={muro.producto}_etiqueta.pdf"
    response.headers["Content-Type"] = "application/pdf"
    return response




@apps.route('/registro_muros', methods=['POST'])
def registro_muros():
    if request.method == 'POST':
        medida = request.form['medida']
        proveedor_id = request.form['proveedores']
        producto = request.form['producto']
        calidad = request.form['calidad']
        existencia = request.form['existencia']
        rotas = request.form['rotas']
        precio = request.form['precio']
        embalaje = request.form['embalaje']
        ubicacion = request.form['ubicacion']
        categoria_id = request.form['categorias']
        
        nuevo_muro = Muro(
            medidas=medida,
            proveedor=proveedor_id,
            producto=producto,
            calidad=calidad,
            existencias=existencia,
            rotas=rotas,
            precio=precio,
            embalaje=embalaje,
            ubicacion=ubicacion,
            categoria=categoria_id
        )
        
        db.session.add(nuevo_muro)
        db.session.commit()
        
        flash('Producto registrado exitosamente!', 'success')
        return redirect(url_for('main.consulta_muros'))



@apps.route('/actualizar_muros', methods=['POST'])
def actualizar_muros():
    if request.method == 'POST':
        id_producto = request.form['id_producto']
        
        muro = Muro.query.get(id_producto)
        if not muro:
            flash('El producto no existe.', 'error')
            return redirect(url_for('consulta_muros'))
        
        muro.medidas = request.form['medidaeditar']
        muro.proveedor = request.form['proveedoreseditar']
        muro.producto = request.form['productoeditar']
        muro.calidad = request.form['calidadeditar']
        muro.existencias = request.form['existenciaeditar']
        muro.rotas = request.form['rotaseditar']
        muro.precio = request.form['precioeditar']
        muro.embalaje = request.form['embalajeeditar']
        muro.ubicacion = request.form['ubicacioneditar']
        muro.categoria = request.form['categoriaseditar']

        db.session.commit()

        flash('Producto actualizado exitosamente!', 'info')
        return redirect(url_for('main.consulta_muros'))
    

@apps.route('/eliminar_muros/<int:muro_id>', methods=['POST'])
def eliminar_muros(muro_id):
    muro = Muro.query.get(muro_id)
    
    if not muro:
        flash('El muro no existe o ya ha sido eliminado.', 'error')
        return redirect(url_for('main.consulta_muros'))

    db.session.delete(muro)
    db.session.commit()

    flash('Producto eliminado correctamente!', 'error')
    return redirect(url_for('main.consulta_muros'))



@apps.route('/consulta_adhesivos')
@login_required
@no_cache
def consulta_adhesivos():
    page = request.args.get('page', 1, type=int)  
    per_page = request.args.get('per_page', 6, type=int)  
    search = request.args.get('search', '', type=str)  

    adhesivos_query = Adhesivo.query \
        .join(Proveedor, Adhesivo.proveedor == Proveedor.id_proveedor) \
        .join(Categoria, Adhesivo.categoria == Categoria.id_categoria) \
        .add_columns(
            Adhesivo.id_adhesivos, Adhesivo.nombre, Adhesivo.kilogramos, Adhesivo.existencia,
            Adhesivo.precio, Adhesivo.ubicacion,
            Proveedor.nombre.label('proveedor_nombre'), Proveedor.id_proveedor,
            Categoria.nombre.label('categoria_nombre'), Categoria.id_categoria
        )

    if search:  
        adhesivos_query = adhesivos_query.filter(
            Adhesivo.nombre.ilike(f"%{search}%") |
            Adhesivo.kilogramos.ilike(f"%{search}%") |
            Adhesivo.existencia.ilike(f"%{search}%") |
            Adhesivo.precio.ilike(f"%{search}%") |
            Adhesivo.ubicacion.ilike(f"%{search}%") |
            Proveedor.nombre.ilike(f"%{search}%") |
            Categoria.nombre.ilike(f"%{search}%")
        )

    adhesivos_paginated = adhesivos_query.paginate(page=page, per_page=per_page)

    proveedores = Proveedor.query.all()
    categorias = Categoria.query.all()

    return render_template(
        '/adhesivos/adhesivos.html',
        adhesivos=adhesivos_paginated.items,  
        pagination=adhesivos_paginated,  
        proveedores=proveedores,
        categorias=categorias, max=max, min=min
    )


@apps.route('/obtener_todos_adhesivos')

def obtener_todos_adhesivos():
    productos = db.session.query(
        Adhesivo.id_adhesivos,
        Adhesivo.nombre,
        Adhesivo.kilogramos,
        Adhesivo.existencia,
        Adhesivo.precio,
        Adhesivo.ubicacion,
        Proveedor.nombre.label('proveedor_nombre'),
        Proveedor.id_proveedor,
        Categoria.nombre.label('categoria_nombre'),
        Categoria.id_categoria
    ).join(Proveedor, Adhesivo.proveedor == Proveedor.id_proveedor) \
     .join(Categoria, Adhesivo.categoria == Categoria.id_categoria) \
     .all()

    productos_list = [
        {
            'id_adhesivos': producto.id_adhesivos,
            'nombre': producto.nombre,
            'kilogramos': producto.kilogramos,
            'existencia': producto.existencia,
            'precio': producto.precio,
            'ubicacion': producto.ubicacion,
            'proveedor_nombre': producto.proveedor_nombre,
            'id_proveedor': producto.id_proveedor,
            'categoria_nombre': producto.categoria_nombre,
            'id_categoria': producto.id_categoria
        }
        for producto in productos
    ]

    return jsonify(productos_list)


@apps.route('/registro_adhesivos', methods=['POST'])
def registro_adhesivos():
    if request.method == 'POST':
        proveedor_id = request.form['proveedores']
        nombre = request.form['producto']
        kilogramos = request.form['kilogramos']
        existencia = request.form['existencia']
        precio = request.form['precio']
        ubicacion = request.form['ubicacion']
        categoria_id = request.form['categorias']

        try:
            nuevo_adhesivo = Adhesivo(
                proveedor=proveedor_id,
                nombre=nombre,
                kilogramos=kilogramos,
                existencia=existencia,
                precio=precio,
                ubicacion=ubicacion,
                categoria=categoria_id
            )

            db.session.add(nuevo_adhesivo)
            db.session.commit()

            flash('Producto registrado exitosamente!', 'success')
        except Exception as e:
            db.session.rollback()
            flash(f'Error al registrar el producto: {str(e)}', 'danger')
        finally:
            db.session.close()

        return redirect(url_for('main.consulta_adhesivos'))


@apps.route('/actualizar_adhesivos', methods=['POST'])
def actualizar_adhesivos():
    if request.method == 'POST':
        id_producto = request.form['id_producto']
        proveedor_id = request.form['proveedoreseditar']
        producto = request.form['productoeditar']
        kilogramos = request.form['kilogramoseditar']
        existencia = request.form['existenciaeditar']
        precio = request.form['precioeditar']
        ubicacion = request.form['ubicacioneditar']
        categoria_id = request.form['categoriaseditar']

        try:
            adhesivo = Adhesivo.query.get(id_producto)
            
            adhesivo.proveedor = proveedor_id
            adhesivo.nombre = producto
            adhesivo.kilogramos = kilogramos
            adhesivo.existencia = existencia
            adhesivo.precio = precio
            adhesivo.ubicacion = ubicacion
            adhesivo.categoria = categoria_id

            db.session.commit()

            flash('Producto actualizado exitosamente!', 'info')
        except Exception as e:
            db.session.rollback()
            flash(f'Error al actualizar el producto: {str(e)}', 'danger')
        finally:
            db.session.close()

        return redirect(url_for('main.consulta_adhesivos'))


@apps.route('/eliminar_adhesivos/<int:adhesivo_id>', methods=['POST'])
def eliminar_adhesivos(adhesivo_id):
    try:
        adhesivo = Adhesivo.query.get_or_404(adhesivo_id)
        
        db.session.delete(adhesivo)
        db.session.commit()

        flash('Producto eliminado correctamente!', 'error')
    except Exception as e:
        db.session.rollback()
        flash(f'Error al eliminar el producto: {str(e)}', 'danger')
    finally:
        db.session.close()

    return redirect(url_for('main.consulta_adhesivos'))




@apps.route('/consulta_sanitarios')
@login_required
@no_cache
def consulta_sanitarios():
    page = request.args.get('page', 1, type=int)  
    per_page = request.args.get('per_page', 6, type=int)  
    search = request.args.get('search', '', type=str)  

    sanitarios_query = Sanitario.query.join(Proveedor, Sanitario.proveedor_id == Proveedor.id_proveedor)\
        .join(Categoria, Sanitario.categoria_id == Categoria.id_categoria)\
        .add_columns(
            Sanitario.id_sanitario,
            Sanitario.nombre,
            Sanitario.existencias,
            Sanitario.rotas,
            Sanitario.precio,
            Sanitario.ubicacion,
            Proveedor.nombre.label('proveedor_nombre'),
            Proveedor.id_proveedor,
            Categoria.nombre.label('categoria_nombre'),
            Categoria.id_categoria
        )

    if search:
        sanitarios_query = sanitarios_query.filter(
            Sanitario.nombre.ilike(f"%{search}%") |
            Sanitario.existencias.ilike(f"%{search}%") |
            Sanitario.rotas.ilike(f"%{search}%") |
            Sanitario.precio.ilike(f"%{search}%") |
            Sanitario.ubicacion.ilike(f"%{search}%") |
            Proveedor.nombre.ilike(f"%{search}%") |
            Categoria.nombre.ilike(f"%{search}%")
        )

    
    sanitarios_paginated = sanitarios_query.paginate(page=page, per_page=per_page)

    proveedores = Proveedor.query.all()
    categorias = Categoria.query.all()

    return render_template(
        '/sanitarios/sanitarios.html',
        sanitarios=sanitarios_paginated.items,  
        pagination=sanitarios_paginated,  
        proveedores=proveedores,
        categorias=categorias
    )





@apps.route('/obtener_todos_sanitarios')
@login_required
def obtener_todos_sanitarios():
    sanitarios = Sanitario.query.join(Proveedor).join(Categoria).add_columns(
        Sanitario.id_sanitario,
        Sanitario.nombre,
        Sanitario.existencias,
        Sanitario.rotas,
        Sanitario.precio,
        Sanitario.ubicacion,
        Proveedor.nombre.label('proveedor_nombre'),
        Proveedor.id_proveedor.label('proveedor_id'),
        Categoria.nombre.label('categoria_nombre'),
        Categoria.id_categoria.label('categoria_id')
    ).all()

    sanitarios_json = [
        {
            "id_sanitario": sanitario.id_sanitario,
            "nombre": sanitario.nombre,
            "existencias": sanitario.existencias,
            "rotas": sanitario.rotas,
            "precio": sanitario.precio,
            "ubicacion": sanitario.ubicacion,
            "proveedor_nombre": sanitario.proveedor_nombre,
            "proveedor_id": sanitario.proveedor_id,
            "categoria_nombre": sanitario.categoria_nombre,
            "categoria_id": sanitario.categoria_id
        } for sanitario in sanitarios
    ]

    return jsonify(sanitarios_json)




@apps.route('/registro_sanitarios', methods=['POST'])
@login_required
def registro_sanitarios():
    if request.method == 'POST':
        try:
            proveedor_id = request.form['proveedores']
            nombre = request.form['producto']
            existencias = request.form['existencia']
            rotas = request.form['rotas']
            precio = request.form['precio']
            ubicacion = request.form['ubicacion']
            categoria_id = request.form['categorias']

            nuevo_sanitario = Sanitario(
                proveedor_id=proveedor_id,
                nombre=nombre,
                existencias=existencias,
                rotas=rotas,
                precio=precio,
                ubicacion=ubicacion,
                categoria_id=categoria_id
            )

            db.session.add(nuevo_sanitario)
            db.session.commit()

            flash('Producto registrado exitosamente!', 'success')
        except Exception as e:
            db.session.rollback()
            flash(f'Error al registrar el producto: {str(e)}', 'danger')

        return redirect(url_for('main.consulta_sanitarios'))


@apps.route('/actualizar_sanitarios', methods=['POST'])
@login_required
def actualizar_sanitarios():
    if request.method == 'POST':
        try:
            id_producto = request.form['id_producto']
            proveedor_id = request.form['proveedoreseditar']
            producto = request.form['productoeditar']
            existencia = request.form['existenciaeditar']
            rotas = request.form['rotaseditar']
            precio = request.form['precioeditar']
            ubicacion = request.form['ubicacioneditar']
            categoria_id = request.form['categoriaseditar']

            sanitario = Sanitario.query.get(id_producto)

            if sanitario:
                sanitario.proveedor_id = proveedor_id
                sanitario.nombre = producto
                sanitario.existencias = existencia
                sanitario.rotas = rotas
                sanitario.precio = precio
                sanitario.ubicacion = ubicacion
                sanitario.categoria_id = categoria_id

                db.session.commit()

                flash('Producto actualizado exitosamente!', 'info')
            else:
                flash('Producto no encontrado.', 'danger')

        except Exception as e:
            db.session.rollback()
            flash(f'Error al actualizar el producto: {str(e)}', 'danger')

        return redirect(url_for('main.consulta_sanitarios'))

@apps.route('/eliminar_sanitarios/<int:sanitario_id>', methods=['POST'])
@login_required
def eliminar_sanitarios(sanitario_id):
    try:
        sanitario = Sanitario.query.get(sanitario_id)
        
        if sanitario:
            db.session.delete(sanitario)
            db.session.commit()

            flash('Producto eliminado correctamente!', 'error')
        else:
            flash('Producto no encontrado.', 'danger')

    except Exception as e:
        db.session.rollback()
        flash(f'Error al eliminar el producto: {str(e)}', 'danger')

    return redirect(url_for('main.consulta_sanitarios'))



@apps.route('/consulta_tinacos')
@login_required
@no_cache
def consulta_tinacos():
    page = request.args.get('page', 1, type=int)  
    per_page = request.args.get('per_page', 6, type=int)  
    search = request.args.get('search', '', type=str)  

    tinacos_query = Tinaco.query.join(Proveedor, Tinaco.proveedor_id == Proveedor.id_proveedor)\
        .join(Categoria, Tinaco.categoria_id == Categoria.id_categoria)\
        .add_columns(
            Tinaco.id_tinaco,
            Tinaco.nombre,
            Tinaco.litros,
            Tinaco.color,
            Tinaco.existencias,
            Tinaco.rotas,
            Tinaco.precio,
            Tinaco.ubicacion,
            Proveedor.nombre.label('proveedor_nombre'),
            Proveedor.id_proveedor,
            Categoria.nombre.label('categoria_nombre'),
            Categoria.id_categoria
        )

    if search:
        tinacos_query = tinacos_query.filter(
            Tinaco.nombre.ilike(f"%{search}%") |
            Proveedor.nombre.ilike(f"%{search}%") |
            Categoria.nombre.ilike(f"%{search}%") |
            Tinaco.existencias.ilike(f"%{search}%") |
            Tinaco.rotas.ilike(f"%{search}%") |
            Tinaco.precio.ilike(f"%{search}%") |
            Tinaco.color.ilike(f"%{search}%") |
            Tinaco.ubicacion.ilike(f"%{search}%") |
            Tinaco.litros.ilike(f"%{search}%")
        )

    
    tinacos_paginated = tinacos_query.paginate(page=page, per_page=per_page)

    proveedores = Proveedor.query.all()
    categorias = Categoria.query.all()

    return render_template(
        '/tinacos/tinacos.html',
        tinacos=tinacos_paginated.items,  
        pagination=tinacos_paginated,  
        proveedores=proveedores,
        categorias=categorias
    )



@apps.route('/obtener_todos_tinacos')
@login_required
@no_cache
def obtener_todos_tinacos():
    try:
        tinacos = Tinaco.query.join(Proveedor).join(Categoria).add_columns(
            Tinaco.id_tinaco,
            Tinaco.nombre,
            Tinaco.litros,
            Tinaco.color,
            Tinaco.existencias,
            Tinaco.rotas,
            Tinaco.precio,
            Tinaco.ubicacion,
            Proveedor.nombre.label('proveedor_nombre'),
            Proveedor.id_proveedor,
            Categoria.nombre.label('categoria_nombre'),
            Categoria.id_categoria
        ).all()

        productos = [
            {
                'id_tinaco': tinaco.id_tinaco,
                'nombre': tinaco.nombre,
                'litros': tinaco.litros,
                'color': tinaco.color,
                'existencias': tinaco.existencias,
                'rotas': tinaco.rotas,
                'precio': tinaco.precio,
                'ubicacion': tinaco.ubicacion,
                'proveedor_nombre': tinaco.proveedor_nombre,
                'id_proveedor': tinaco.id_proveedor,
                'categoria_nombre': tinaco.categoria_nombre,
                'id_categoria': tinaco.id_categoria
            }
            for tinaco in tinacos
        ]

        return jsonify(productos)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@apps.route('/registro_tinacos', methods=['POST'])
def registro_tinacos():
    if request.method == 'POST':
        try:
            proveedor_id = request.form['proveedores']
            nombre = request.form['producto']
            litros = request.form['litros']
            color = request.form['color']
            existencias = request.form['existencia']
            rotas = request.form['rotas']
            precio = request.form['precio']
            ubicacion = request.form['ubicacion']
            categoria_id = request.form['categorias']

            nuevo_tinaco = Tinaco(
                proveedor_id=proveedor_id,
                nombre=nombre,
                litros=litros,
                color=color,
                existencias=existencias,
                rotas=rotas,
                precio=precio,
                ubicacion=ubicacion,
                categoria_id=categoria_id
            )

            db.session.add(nuevo_tinaco)
            db.session.commit()

            flash('Producto registrado exitosamente!', 'success')
        except Exception as e:
            db.session.rollback()
            flash(f'Ocurrió un error al registrar el producto: {str(e)}', 'error')

        return redirect(url_for('main.consulta_tinacos'))



@apps.route('/actualizar_tinacos', methods=['POST'])
def actualizar_tinacos():
    if request.method == 'POST':
        try:
            id_tinaco = request.form['id_producto']
            proveedor_id = request.form['proveedoreseditar']
            nombre = request.form['productoeditar']
            litros = request.form['litroseditar']
            color = request.form['coloreditar']
            existencias = request.form['existenciaeditar']
            rotas = request.form['rotaseditar']
            precio = request.form['precioeditar']
            ubicacion = request.form['ubicacioneditar']
            categoria_id = request.form['categoriaseditar']

            tinaco = Tinaco.query.get(id_tinaco)

            if not tinaco:
                flash('El producto no existe.', 'error')
                return redirect(url_for('consulta_tinacos'))

            tinaco.proveedor_id = proveedor_id
            tinaco.nombre = nombre
            tinaco.litros = litros
            tinaco.color = color
            tinaco.existencias = existencias
            tinaco.rotas = rotas
            tinaco.precio = precio
            tinaco.ubicacion = ubicacion
            tinaco.categoria_id = categoria_id

            db.session.commit()

            flash('Producto actualizado exitosamente!', 'info')
        except Exception as e:
            db.session.rollback()
            flash(f'Ocurrió un error al actualizar el producto: {str(e)}', 'error')

        return redirect(url_for('main.consulta_tinacos'))


@apps.route('/eliminar_tinacos/<int:tinaco_id>', methods=['POST'])
def eliminar_tinacos(tinaco_id):
    if request.method == 'POST':
        try:
            tinaco = Tinaco.query.get(tinaco_id)

            if not tinaco:
                flash('El producto no existe.', 'error')
                return redirect(url_for('consulta_tinacos'))

            db.session.delete(tinaco)
            db.session.commit()

            flash('Producto eliminado correctamente!', 'error')
        except Exception as e:
            db.session.rollback()
            flash(f'Ocurrió un error al eliminar el producto: {str(e)}', 'error')

        return redirect(url_for('main.consulta_tinacos'))



        
@apps.route('/consulta_vitroblocks')
@login_required
@no_cache
def consulta_vitroblocks():
    page = request.args.get('page', 1, type=int)  
    per_page = request.args.get('per_page', 6, type=int) 
    search = request.args.get('search', '', type=str)  

    vitroblocks_query = Vitroblock.query.join(Proveedor).join(Categoria).add_columns(
        Vitroblock.id_vitroblock,
        Vitroblock.tipo,
        Vitroblock.medidas,
        Vitroblock.nombre,
        Vitroblock.existencias,
        Vitroblock.rotas,
        Vitroblock.precio,
        Vitroblock.ubicacion,
        Proveedor.nombre.label('proveedor_nombre'),
        Categoria.nombre.label('categoria_nombre')
    )

    if search:
        vitroblocks_query = vitroblocks_query.filter(
            Vitroblock.nombre.ilike(f"%{search}%") |
            Vitroblock.tipo.ilike(f"%{search}%") |
            Vitroblock.medidas.ilike(f"%{search}%") |
            Vitroblock.existencias.ilike(f"%{search}%") |
            Vitroblock.rotas.ilike(f"%{search}%") |
            Vitroblock.precio.ilike(f"%{search}%") |
            Vitroblock.ubicacion.ilike(f"%{search}%") |
            Proveedor.nombre.ilike(f"%{search}%") |
            Categoria.nombre.ilike(f"%{search}%")
        )

    vitroblocks_paginated = vitroblocks_query.paginate(page=page, per_page=per_page, error_out=False)

    proveedores = Proveedor.query.all()
    categorias = Categoria.query.all()

    return render_template(
        '/vitroblocks/vitroblock.html',
        vitroblocks=vitroblocks_paginated.items,
        pagination=vitroblocks_paginated,
        proveedores=proveedores,
        categorias=categorias,
        search=search  
    )



@apps.route('/obtener_todos_vitroblocks')
@login_required
def obtener_todos_vitroblocks():
    try:
        vitroblocks = Vitroblock.query.join(Proveedor, Vitroblock.proveedor == Proveedor.id_proveedor) \
                                      .join(Categoria, Vitroblock.categoria == Categoria.id_categoria) \
                                      .add_columns(
                                          Vitroblock.id_vitroblock, Vitroblock.tipo, Vitroblock.medidas, 
                                          Vitroblock.nombre, Vitroblock.existencias, Vitroblock.rotas, 
                                          Vitroblock.precio, Vitroblock.ubicacion,
                                          Proveedor.nombre.label('proveedor_nombre'),
                                          Categoria.nombre.label('categoria_nombre')
                                      ).all()

        productos = [
            {
                'id_vitroblock': v.id_vitroblock,
                'tipo': v.tipo,
                'medidas': v.medidas,
                'nombre': v.nombre,
                'existencias': v.existencias,
                'rotas': v.rotas,
                'precio': v.precio,
                'ubicacion': v.ubicacion,
                'proveedor_nombre': v.proveedor_nombre,
                'categoria_nombre': v.categoria_nombre
            }
            for v in vitroblocks
        ]

        return jsonify(productos)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@apps.route('/registro_vitroblocks', methods=['POST'])
def registro_vitroblocks():
    if request.method == 'POST':
        proveedor_id = request.form['proveedores']
        tipo = request.form['tipo']
        medidas = request.form['medidas']
        nombre = request.form['nombre']
        existencias = request.form['existencia']
        rotas = request.form['rotas']
        precio = request.form['precio']
        ubicacion = request.form['ubicacion']
        categoria_id = request.form['categorias']
        
        nuevo_vitroblock = Vitroblock(
            proveedor=proveedor_id,
            tipo=tipo,
            medidas=medidas,
            nombre=nombre,
            existencias=existencias,
            rotas=rotas,
            precio=precio,
            ubicacion=ubicacion,
            categoria=categoria_id
        )

        db.session.add(nuevo_vitroblock)
        db.session.commit()

        flash('Producto registrado exitosamente!', 'success')
        return redirect(url_for('main.consulta_vitroblocks'))


@apps.route('/actualizar_vitroblocks', methods=['POST'])
def actualizar_vitroblocks():
    if request.method == 'POST':
        id_vitroblock = request.form['id_producto']
        proveedor_id = request.form['proveedoreseditar']
        tipo = request.form['tipoeditar']
        medidas = request.form['medidaseditar']
        nombre = request.form['nombreeditar']
        existencia = request.form['existenciaeditar']
        rotas = request.form['rotaseditar']
        precio = request.form['precioeditar']
        ubicacion = request.form['ubicacioneditar']
        categoria_id = request.form['categoriaseditar']

        producto = Vitroblock.query.get(id_vitroblock)
        
        if producto:
            producto.proveedor = proveedor_id
            producto.tipo = tipo
            producto.medidas = medidas
            producto.nombre = nombre
            producto.existencias = existencia
            producto.rotas = rotas
            producto.precio = precio
            producto.ubicacion = ubicacion
            producto.categoria = categoria_id
            
            db.session.commit()
            flash('Producto actualizado exitosamente!', 'info')
        else:
            flash('Producto no encontrado.', 'error')

        return redirect(url_for('main.consulta_vitroblocks'))


@apps.route('/eliminar_vitroblocks/<int:vitroblock_id>', methods=['POST'])
def eliminar_vitroblocks(vitroblock_id):
    if request.method == 'POST':
        try:
            vitroblock = Vitroblock.query.get(vitroblock_id)

            if not vitroblock:
                flash('El producto no existe.', 'error')
                return redirect(url_for('consulta_tinacos'))

            db.session.delete(vitroblock)
            db.session.commit()

            flash('Producto eliminado correctamente!', 'error')
        except Exception as e:
            db.session.rollback()
            flash(f'Ocurrió un error al eliminar el producto: {str(e)}', 'error')

        return redirect(url_for('main.consulta_vitroblocks'))



@apps.route('/descargar_etiqueta_producto/<int:producto_id>')
def descargar_etiqueta_producto(producto_id):
    producto = Producto.query.get_or_404(producto_id)
    proveedor = Proveedor.query.get_or_404(producto.proveedor)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_line_width(1)
    pdf.rect(10, 10, 90, 50)

    nombre_imagen = proveedor.foto
    ruta_imagen = os.path.join(os.getcwd(), 'app', 'static', 'uploads', nombre_imagen)

    if os.path.exists(ruta_imagen):
        pdf.image(ruta_imagen, x=11, y=11, w=30)
    else:
        print(f"La imagen no se encuentra en la ruta especificada: {ruta_imagen}")
        pdf.set_font("Arial", size=10)
        pdf.set_xy(11, 11)
        pdf.cell(30, 10, "Imagen no disponible", border=1, align="C")

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(75, 15)
    pdf.cell(0, 10, txt=f"{producto.medidas}")

    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(10, 30)
    pdf.cell(90, 10, txt=producto.producto.upper(), align="C")

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(78, 48)
    pdf.cell(0, 10, txt=f"{producto.precio}")

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(15, 48)
    pdf.cell(0, 10, txt=f"{producto.embalaje}")

    output_pdf = BytesIO()
    pdf.output(output_pdf)
    output_pdf.seek(0)

    response = make_response(output_pdf.read())
    response.headers["Content-Disposition"] = f"attachment; filename={producto.producto}_etiqueta.pdf"
    response.headers["Content-Type"] = "application/pdf"
    return response



@apps.route('/descargar_etiqueta_adhesivo/<int:adhesivo_id>')
def descargar_etiqueta_adhesivo(adhesivo_id):
    # Obtener el adhesivo y su proveedor
    adhesivo = Adhesivo.query.get_or_404(adhesivo_id)
    proveedor = Proveedor.query.get_or_404(adhesivo.proveedor)  # Relación con el proveedor

    # Crear el PDF
    pdf = FPDF()
    pdf.add_page()

    pdf.set_line_width(1)  
    pdf.rect(10, 10, 90, 50)  

    # Obtener la ruta de la imagen
    nombre_imagen = proveedor.foto
    ruta_imagen = os.path.join(os.getcwd(), 'app', 'static', 'uploads', nombre_imagen)

    # Verificar si la imagen existe
    if os.path.exists(ruta_imagen):
        pdf.image(ruta_imagen, x=11, y=11, w=30)
    else:
        print(f"La imagen no se encuentra en la ruta especificada: {ruta_imagen}")
        pdf.set_font("Arial", size=10)
        pdf.set_xy(11, 11)
        pdf.cell(30, 10, "Imagen no disponible", border=1, align="C")

    # Agregar datos al PDF
    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(78, 15)  
    pdf.cell(0, 10, txt=f"{adhesivo.kilogramos}")
    
    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(10, 25)  
    pdf.cell(90, 10, txt=proveedor.nombre.upper(), align="C")  

    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(10, 35)  
    pdf.cell(90, 10, txt=adhesivo.nombre.upper(), align="C")  

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(78, 48)  
    pdf.cell(0, 10, txt=f"{adhesivo.precio}")

    # Crear el archivo PDF en memoria y devolverlo como respuesta
    output_pdf = BytesIO()
    pdf.output(output_pdf)
    output_pdf.seek(0)

    response = make_response(output_pdf.read())
    response.headers["Content-Disposition"] = f"attachment; filename={adhesivo.nombre}_etiqueta.pdf"
    response.headers["Content-Type"] = "application/pdf"
    return response

@apps.route('/descargar_etiqueta_sanitario/<int:sanitario_id>')
def descargar_etiqueta_sanitario(sanitario_id):
    sanitario = Sanitario.query.get_or_404(sanitario_id)
    proveedor = Proveedor.query.get_or_404(sanitario.proveedor_id) 

    pdf = FPDF()
    pdf.add_page()

    pdf.set_line_width(1)  
    pdf.rect(10, 10, 90, 50)  

    nombre_imagen = proveedor.foto
    ruta_imagen = os.path.join(os.getcwd(), 'app', 'static', 'uploads', nombre_imagen)

    if os.path.exists(ruta_imagen):
        pdf.image(ruta_imagen, x=40, y=13, w=30)
    else:
        print(f"La imagen no se encuentra en la ruta especificada: {ruta_imagen}")
        pdf.set_font("Arial", size=10)
        pdf.set_xy(40, 13)
        pdf.cell(30, 10, "Imagen no disponible", border=1, align="C")

    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(10, 30)  
    pdf.cell(90, 10, txt=sanitario.nombre.upper(), align="C")  

    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(50, 48)  
    pdf.cell(90, 10, txt=f"{sanitario.precio}")

    output_pdf = BytesIO()
    pdf.output(output_pdf)
    output_pdf.seek(0)

    response = make_response(output_pdf.read())
    response.headers["Content-Disposition"] = f"attachment; filename={sanitario.nombre}_etiqueta.pdf"
    response.headers["Content-Type"] = "application/pdf"
    return response



@apps.route('/descargar_etiqueta_tinaco/<int:tinaco_id>')
def descargar_etiqueta_tinaco(tinaco_id):
    tinaco = Tinaco.query.get_or_404(tinaco_id)
    proveedor = Proveedor.query.get_or_404(tinaco.proveedor_id)

    pdf = FPDF()
    pdf.add_page()

    pdf.set_line_width(1)  
    pdf.rect(10, 10, 90, 50)  

    nombre_imagen = proveedor.foto
    ruta_imagen = os.path.join(os.getcwd(), 'app', 'static', 'uploads', nombre_imagen)

    if os.path.exists(ruta_imagen):
        pdf.image(ruta_imagen, x=40, y=13, w=30)
    else:
        print(f"La imagen no se encuentra en la ruta especificada: {ruta_imagen}")
        pdf.set_font("Arial", size=10)
        pdf.set_xy(40, 13)
        pdf.cell(30, 10, "Imagen no disponible", border=1, align="C")

    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(0, 30)  
    pdf.cell(78, 10, txt=tinaco.nombre.upper(), align="C")  

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(15, 45)  
    pdf.cell(90, 10, txt=f"{tinaco.litros}")

    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(20, 30)  
    pdf.cell(98, 10, txt=tinaco.color.upper(), align="C")

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(73, 45)  
    pdf.cell(90, 10, txt=f"{tinaco.precio}")

    output_pdf = BytesIO()
    pdf.output(output_pdf)
    output_pdf.seek(0)

    response = make_response(output_pdf.read())
    response.headers["Content-Disposition"] = f"attachment; filename={tinaco.nombre}_etiqueta.pdf"
    response.headers["Content-Type"] = "application/pdf"
    return response

@apps.route('/descargar_etiqueta_vitroblock/<int:vitroblock_id>')
def descargar_etiqueta_vitroblock(vitroblock_id):
    # Obtener el vitroblock y su proveedor
    vitroblock = Vitroblock.query.get_or_404(vitroblock_id)
    proveedor = Proveedor.query.get_or_404(vitroblock.proveedor)  # Relación con el proveedor

    # Crear el PDF
    pdf = FPDF()
    pdf.add_page()

    pdf.set_line_width(1)  
    pdf.rect(10, 10, 90, 50)  

    # Obtener la ruta de la imagen
    nombre_imagen = proveedor.foto
    ruta_imagen = os.path.join(os.getcwd(), 'app', 'static', 'uploads', nombre_imagen)

    # Verificar si la imagen existe
    if os.path.exists(ruta_imagen):
        pdf.image(ruta_imagen, x=10, y=13, w=30)
    else:
        print(f"La imagen no se encuentra en la ruta especificada: {ruta_imagen}")
        pdf.set_font("Arial", size=10)
        pdf.set_xy(10, 13)
        pdf.cell(30, 10, "Imagen no disponible", border=1, align="C")

    # Agregar datos al PDF
    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(10, 25)  
    pdf.cell(90, 10, txt=vitroblock.nombre.upper(), align="C")  

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(15, 45)  
    pdf.cell(90, 10, txt=f"{vitroblock.medidas}")

    pdf.set_font("Arial", "B", size=18)
    pdf.set_xy(10, 35)  
    pdf.cell(90, 10, txt=vitroblock.tipo.upper(), align="C")

    pdf.set_font("Arial", "B", size=15)
    pdf.set_xy(73, 45)  
    pdf.cell(90, 10, txt=f"{vitroblock.precio}")

    # Crear el archivo PDF en memoria y devolverlo como respuesta
    output_pdf = BytesIO()
    pdf.output(output_pdf)
    output_pdf.seek(0)

    response = make_response(output_pdf.read())
    response.headers["Content-Disposition"] = f"attachment; filename={vitroblock.nombre}_etiqueta.pdf"
    response.headers["Content-Type"] = "application/pdf"
    return response


@apps.route('/logout')
def logout():
    session.pop('logeado', None)
    return redirect(url_for('main.home'))
