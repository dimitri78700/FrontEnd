import React from 'react';
import './Contact.css';
function Contact() {
    return (
        <section id="contact">
            <h2>Contact</h2>
            <p>Vous avez un projet ? Discutons-en !</p>
            <form action="#" method="post">
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" cols="30" rows="10"></textarea>
                <input type="submit" value="Envoyer" />
            </form>
        </section>
    );
}

export default Contact;
