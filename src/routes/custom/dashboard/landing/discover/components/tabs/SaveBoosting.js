import React from 'react';
import Typography from '@material-ui/core/Typography';

const SaveBoosting = () => {
    return (
       <Typography component="div" style={{ padding: 8 * 3 }}>
         <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '5vh 10vw' }}>
            <div className='container'>
               <div className="row mb-70 flex-column intro">
                  <p data-aos="fade-left" className='mt-20 text-justify'>
                     Le réseau MicroCap est constituée de personnes désirant réaliser une 
                     épargne pour un projet personnel ou un projet d'entreprise.
                  </p>
                  <p data-aos="fade-left" className='mt-20 text-justify'>
                     Pour faciliter les projets de ses membres, MicroCap sélectionne et négocie auprès 
                     des partenaires financiers la distribution sur sa plateforme des produits d'épargne 
                     les plus appropriés à son objet, à la condition que l'épargne collectée soit essentiellement 
                     réservée au financement des projets de la plateforme MicroCap. Le placement de l'épargne 
                     reste transparent, l'épargnant sait à qui et à quel projet sont épargne sert.
                  </p>

                  
                  <h3 className='text-center text-black mt-4'>Nos produits d'épargnes</h3>

                  <div className="table-responsive mt-25">
                     <table className="table table-hover table-bordered mb-0">
                        <thead>
                              <tr style={{ backgroundColor: '#ffb93a' }}>
                                 <th className='text-white'>
                                    <p>Epargne bancaire</p>
                                 </th>
                                 <th className='text-white'>
                                    <p>Les placements alternatifs</p>
                                 </th>
                              </tr>
                        </thead>
                        <tbody>
                              <tr>
                                 <td>
                                    <p>ESH MUPECI</p>
                                 </td>
                                 <td>
                                    <p>DAT MUPECI</p>
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <p></p>
                                 </td>
                                 <td>
                                    <p>SERHAB</p>
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <p></p>
                                 </td>
                                 <td>
                                    <p>PLAN REFLEQ</p>
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    <p></p>
                                 </td>
                                 <td>
                                    <p>OPTION MICROCAP</p>
                                 </td>
                              </tr>
                        </tbody>
                     </table>
                  </div>

                  <div style={{ margin: '5%' }}>
                     <h3 className="font-weight-bold text-black text-left" data-aos="fade-right">
                        Les produits d'épargne bancaire :
                     </h3>
                     <p data-aos="fade-left" className='text-left mt-20 text-justify'>
                        Ces produits sont émis et commercialisés par des établissements financiers partenaires, 
                        habilités à collecter l'épargne. Notre plateforme distribue ces produits en qualité de 
                        courtier et les versements perçus par notre système sont transmis à l'établissement domiciliataire 
                        qui peut également à tout moment fournir un relevé d'opérations
                     </p>


                     <h3 className="font-weight-bold text-black text-left mt-40" data-aos="fade-right">
                        Les produits de placement alternatif
                     </h3>
                     <p data-aos="fade-left" className='mt-20 text-justify'>
                        Les produits de placement alternatif permettent de répondre à des besoins de financement dans 
                        des contextes spécifiques. En qualité d’opérateur de placements alternatifs. MicroCap crée et 
                        gère pour le compte des souscripteurs, des véhicules de placement appropriés. Ces produits sont non 
                        règlementés et par conséquents présentent un risque plus élevé de perte en capital : ne convient donc 
                        pas aux amateurs.
                     </p>

                     <h3 className="font-weight-bold text-black mt-40 text-justify" data-aos="fade-right">
                        Rémunération conventionnelle de votre épargne :
                     </h3>
                     <p data-aos="fade-left" className='mt-20'>
                        L’épargne est rémunérée à un taux conventionnel proposé par l’émetteur du produit.
                     </p>

                     <h3 className="font-weight-bold text-black mt-40 text-justify" data-aos="fade-right">
                        Rémunération supplémentaire, un excellent moyen de booster votre épargne :
                     </h3>
                     <p data-aos="fade-left" className='mt-20 text-justify'>
                        Lorsque l’épargne est mobilisée pour un projet, le gestionnaire peut exiger une rémunération 
                        supplémentaire dont la négociation est faite de gré à gré avec le bénéficiaire sur la bourse de 
                        financement : espace dédié de la plateforme où se rencontrent les demandes et les offres de financement.
                     </p>

                     <h3 className="font-weight-bold text-black mt-40" data-aos="fade-right">
                        Gestion de votre épargne :
                     </h3>
                     <p data-aos="fade-left" className='mt-20 text-justify'>
                        Elle peut être assurée par l’épargnant ou confié à un professionnel agrée sur la plateforme.
                        Attention : l’établissement financier place votre épargne habituellement sous sa responsabilité et 
                        à ses risques : votre épargne reste garantie au terme de la convention. Si vous choisissez d’assurer 
                        personnellement ou de confier à un professionnel la gestion de votre épargne, vous en porter le risque: 
                        les risque de perte en capital sont ainsi à considérer.
                     </p>
                  </div>
               </div>
            </div>
         </div>
       </Typography>
    );
 }

export default SaveBoosting;