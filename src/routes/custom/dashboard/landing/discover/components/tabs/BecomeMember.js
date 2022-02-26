import React from 'react';
import Typography from '@material-ui/core/Typography';

const BecomeMember = () => {
    return (
       <Typography component="div" style={{ padding: 8 * 3 }}>
            <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '5vh 10vw' }}>
                <div className='container'>
                    <div className="row mb-70 flex-column intro">
                        <h3 className="font-weight-bold text-black text-left" data-aos="fade-right">
                            Simple et rapide
                        </h3>
                        <p data-aos="fade-left" className='text-left mt-20'>
                            1. S'incrire sur la plateforme
                        </p>
                        <p data-aos="fade-left" className='text-left mt-20'>
                            2. Souscrire à un PASS MicroCap
                        </p>
                        <p data-aos="fade-left" className='text-left mt-20'>
                            3. Souscrire à un produit d'épargne MicroCap, une épargne qui crée du lien
                            <p className='mt-20 ml-20' style={{ fontSize: '0.9em', fontStyle: 'italic' }}>
                                MicroCap négocie avec des partenaires financiers la distribution sur la plateforme de 
                                leurs produits d'épargne, à la condition que l'épargne collectée soit essentiellement 
                                réservée au financement des projets de la plateforme MicroCap. Notre conventionnement 
                                apporte à l'épargnant une confiance et une transparence jusqu'à présent inégalées grâce 
                                à la possibilité que nous donnons à l'épargnant de décider sur quels entrepreneurs et 
                                sur quels projets placer son épargne
                            </p>
                        </p>
                        <p data-aos="fade-left" className='text-left mt-40'>
                            Rejoignez le mouvement et devenez acteur d'une finance plus inclusive et plus vertueuse. Qui 
                            que vous soyez, il y'a au moins une raison pour rejoindre le réseau MicroCap :2.
                            <ul className='mt-20 ml-30'>
                                <li>Constituer une épargne pour un projet personnel, petit ou grand</li>
                                <li>Constituer des fonds propres pour un projet entrepreneurial</li>
                                <li>Apporter son soutien au projet d'un proche</li>
                                <li>Rechercher des associés</li>
                                <li>Soutenir l'engagement de MicroCap et accélérer notre impact social.</li>
                            </ul>
                        </p>
                        <h3 className="font-weight-bold text-black text-left mt-30" data-aos="fade-right">
                            Nos produits d'épargne
                        </h3>
                        <ul data-aos="fade-left" className='mt-20 ml-30'>
                            <li>INIT REFLEQ</li>
                            <li>MUPECI</li>
                            <li>WAF</li>
                            <li>SERHAB</li>
                            <li>MCM INIT</li>
                            <li>OPTION MICROCAP</li>
                        </ul>
                    </div>
                </div>
            </div>
       </Typography>
    );
 }

export default BecomeMember;