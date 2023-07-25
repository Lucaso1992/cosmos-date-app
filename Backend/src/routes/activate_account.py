from flask import Blueprint
from flask_mail import Message

from utils.mail import mail

activeAccount = Blueprint('activeAccount',__name__)

@activeAccount.route('/activate-account', methods=['GET'])
def activateUser():
    msg = Message(
        subject='Authentication Email',
        sender='noreply@gmail.com',
        recipients=['datingstars23@gmail.com'],
        body='Estoy tratando de mostrar un proceso de autenticacion',
        html='<p>Estoy tratando de mostrar un proceso de autenticacion</p>'
    )
    mail.send(msg)
    return 'Confirm user email please'