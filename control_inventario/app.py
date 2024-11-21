from app import create_app, db

app = create_app()

if __name__ == '__main__':
    app.secret_key = "GLACER2024"  
    app.run(host='0.0.0.0', port=50001, debug=True)
