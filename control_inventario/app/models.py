from app import db


class Proveedor(db.Model):
    __tablename__ = 'proveedores'
    id_proveedor = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    telefono = db.Column(db.String(100))
    correo = db.Column(db.String(100))
    direccion = db.Column(db.String(250))
    foto = db.Column(db.String(250))

class Categoria(db.Model):
    __tablename__ = 'categorias'
    id_categoria = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    descripcion = db.Column(db.String(100))
    
class Producto(db.Model):
    __tablename__ = 'productos'
    id_producto = db.Column(db.Integer, primary_key=True)
    medidas = db.Column(db.String(100))
    proveedor = db.Column(db.Integer, db.ForeignKey('proveedores.id_proveedor'))
    producto = db.Column(db.String(250))
    calidad = db.Column(db.String(250))
    existencias = db.Column(db.Integer, nullable=False)
    rotas = db.Column(db.String(250))
    precio = db.Column(db.String(250))
    embalaje = db.Column(db.String(250))
    ubicacion = db.Column(db.String(250))
    categoria = db.Column(db.Integer, db.ForeignKey('categorias.id_categoria'))
    proveedor_rel = db.relationship('Proveedor', backref='productos')
    categoria_rel = db.relationship('Categoria', backref='productos')

    

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=True, nullable=False)
    apellidos = db.Column(db.String(50), unique=True, nullable=False)
    genero = db.Column(db.String(20), unique=True, nullable=False)
    privilegio = db.Column(db.String(20), unique=True, nullable=False)
    usuario = db.Column(db.String(100), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    


class Muro(db.Model):
    __tablename__ = 'muros'
    id_producto = db.Column(db.Integer, primary_key=True)
    medidas = db.Column(db.String(50), nullable=False)
    producto = db.Column(db.String(100), nullable=False)
    calidad = db.Column(db.String(50), nullable=False)
    existencias = db.Column(db.Integer, nullable=False)
    rotas = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.String(50), nullable=False)
    embalaje = db.Column(db.String(50), nullable=False)
    ubicacion = db.Column(db.String(255), nullable=False)
    proveedor = db.Column(db.Integer, db.ForeignKey('proveedores.id_proveedor'))
    categoria = db.Column(db.Integer, db.ForeignKey('categorias.id_categoria'))

    proveedor_rel = db.relationship('Proveedor', backref='muros')
    categoria_rel = db.relationship('Categoria', backref='muros')


class Adhesivo(db.Model):
    __tablename__ = 'adhesivos'
    id_adhesivos = db.Column(db.Integer, primary_key=True)
    proveedor = db.Column(db.Integer, db.ForeignKey('proveedores.id_proveedor'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    kilogramos = db.Column(db.String, nullable=False)
    existencia = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.String, nullable=False)
    ubicacion = db.Column(db.String(200), nullable=False)
    categoria = db.Column(db.Integer, db.ForeignKey('categorias.id_categoria'), nullable=False)
    
    proveedor_rel = db.relationship('Proveedor', backref='adhesivos')
    categoria_rel = db.relationship('Categoria', backref='adhesivos')


class Sanitario(db.Model):
    __tablename__ = 'sanitarios'
    id_sanitario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    existencias = db.Column(db.Integer, nullable=False)
    rotas = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.String, nullable=False)
    ubicacion = db.Column(db.String(200), nullable=False)
    proveedor_id = db.Column('proveedor', db.Integer, db.ForeignKey('proveedores.id_proveedor'), nullable=False)
    categoria_id = db.Column('categoria', db.Integer, db.ForeignKey('categorias.id_categoria'), nullable=False)

    proveedor_rel = db.relationship('Proveedor', backref='sanitarios')
    categoria_rel = db.relationship('Categoria', backref='sanitarios')


class Tinaco(db.Model):
    __tablename__ = 'tinacos'
    id_tinaco = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    litros = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(50), nullable=False)
    existencias = db.Column(db.Integer, nullable=False)
    rotas = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.String, nullable=False)
    ubicacion = db.Column(db.String(200), nullable=False)
    proveedor_id = db.Column('proveedor', db.Integer, db.ForeignKey('proveedores.id_proveedor'), nullable=False)
    categoria_id = db.Column('categoria', db.Integer, db.ForeignKey('categorias.id_categoria'), nullable=False)

    proveedor_rel = db.relationship('Proveedor', backref='tinacos')
    categoria_rel = db.relationship('Categoria', backref='tinacos')


class Vitroblock(db.Model):
    __tablename__ = 'vitroblocks'
    id_vitroblock = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(50), nullable=False)
    medidas = db.Column(db.String(50), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    existencias = db.Column(db.Integer, nullable=False)
    rotas = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.String, nullable=False)
    ubicacion = db.Column(db.String(200), nullable=False)
    proveedor = db.Column(db.Integer, db.ForeignKey('proveedores.id_proveedor'), nullable=False)
    categoria = db.Column(db.Integer, db.ForeignKey('categorias.id_categoria'), nullable=False)

    proveedor_rel = db.relationship('Proveedor', backref='vitroblocks')
    categoria_rel = db.relationship('Categoria', backref='vitroblocks')
