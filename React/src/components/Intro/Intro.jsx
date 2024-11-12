import React from 'react';
import './Intro.css';
import img from "../../images/sophie-bluel.png";

function Intro () {
    return (
        <section id="introduction">
            <figure>
                <img src={img} alt="sophie bluel" />
            </figure>
            <article>
                <h2>Designer d'espace</h2>
                <p>Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.</p>
                <p>Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.</p>
                <p>En cas de besoin, une équipe pluridisciplinaire peut-être constituée : architecte DPLG, décorateur(trice)</p>
            </article>
        </section>
    );
}

export default Intro ;
