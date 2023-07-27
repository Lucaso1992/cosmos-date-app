import os

def recovery_text(username, token):
    return f""" 
    Estimado/a {username}
    ¿Necesitas cambiar tu contraseña?
    Haz clic en el siguiente enlace para recuperarla:
    {os.getenv('BACKEND_SERVER')}/api/users/forgot-password/{token}
    """

def recovery_html(username, token):
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
                    ¿Necesitas cambiar tu contraseña?
                </p>
                <p style="text-align:center; color: white">
                    Haz clic en el siguiente enlace para recuperarla:
                </p>
                  <a href="{f"{os.getenv('BACKEND_SERVER')}/api/users/forgot-password/{token}"}" style="text-decoration:none; border: 1px; padding: 8px; background:#dfdfdf; border-radius: 10px;color: black; text-align: center; display: block; margin: 0 9rem">
                      Recupera tu cuenta
                  </a>
                <p style="color: white; text-align:center">
                    Si no te has registrado, ignora este correo.
                </p>
                <p style="color: white; text-align:center"> 
                    Si no puedes acceder al enlace, copia y pega la siguiente dirección en tu navegador:<br>
                    {f"{os.getenv('BACKEND_SERVER')}/api/users/forgot-password/{token}"}
                </p>
            </div>
        </body>    
    </html>
    """
    return html