import os

def email_text(username, token):
    return f""" 
    Estimado/a {username}
    ¡Bienvenido/a a Cosmos APP!
    Estamos encantados de que hayas decidido unirte a nuestra comunidad. Para comenzar a aprovechar al máximo nuestros servicios, es necesario que actives tu cuenta siguiendo unos sencillos pasos.
    Haz clic en el siguiente enlace de activación:
    {os.getenv('BACKEND_SERVER')}/api/users/activate/{token}
    """

def email_html(username, token):
    html = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div style="width:-webkit-fill-available; height:-webkit-fill-available; background:#002f64; padding: 2rem 0;">
                <p style="color: white; text-align:center; margin: 2rem;">
                    <strong>Estimado/a {username},</strong>
                    <br> 
                    ¡Bienvenido/a a Cosmos APP!
                    <br><br>
                    Estamos encantados de que hayas decidido unirte a nuestra comunidad. Para comenzar a aprovechar al máximo nuestros servicios, es necesario que actives tu cuenta siguiendo unos sencillos pasos.
                </p>
                <p style="text-align:center; color: white">
                    Haz clic en el siguiente enlace de activación
                </p>
                <a href="{f"{os.getenv('BACKEND_SERVER')}/api/users/activate/{token}"}" style="text-decoration:none; border: 1px; padding: 8px; background:#dfdfdf; border-radius: 10px;color: black; text-align: center; display: block; margin: 0 9rem">
                    Activa tu cuenta
                </a>
                <p style="color: white; text-align:center">
                    Si no te has registrado, ignora este correo.
                </p>
                <p style="color: white; text-align:center"> 
                    Si no puedes acceder al enlace, copia y pega la siguiente dirección en tu navegador:<br>
                    {f"{os.getenv('BACKEND_SERVER')}/api/users/activate/{token}"}
                </p>
            </div>
        </body>    
    </html>
    """
    return html