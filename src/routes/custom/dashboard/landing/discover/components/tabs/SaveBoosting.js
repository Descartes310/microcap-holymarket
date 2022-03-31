import React from 'react';
import Typography from '@material-ui/core/Typography';

const SaveBoosting = () => {
    return (
       <Typography component="div" style={{ padding: 8 * 3 }}>
         <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '5vh 10vw' }}>
            <div className='container'>
               <div className="row mb-70 flex-column intro">
                  <h3 className="font-weight-bold text-black text-left" data-aos="fade-right">
                        Booster votre épargne
                  </h3>
                  <p data-aos="fade-left" className='text-left mt-20'>
                     Nos partenaires courtiers ou établissements financiers proposent sur notre 
                     site exclusivement les produits d'épargne compatible MicroCap, c'est-à-dire 
                     une épargne destinée au financement des entrepreneurs de la plateforme MicroCap.
                  </p>
                  <p data-aos="fade-left" className='text-left mt-20'>
                     Pour être membre du réseau MicroCap, il faut détenir au moins un produit d'épargne 
                     MicroCap. La plateforme propose une bourse des financements : espace dédié où se 
                     négocie entre membre du réseau, les offres et les demandes de financement.
                  </p>
                  <div style={{ margin: '5%' }}>
                     <h3 className="font-weight-bold text-black text-left" data-aos="fade-right">
                        Fructifier votre épargne
                     </h3>
                     <p data-aos="fade-left" className='text-left mt-20'>
                        Les offres de financement se négocient de gré à gré dans la bourse des financements. 
                        Un dispositif de contractualisation permet aux parties de sceller un accord de rémunération. 
                        Vous pouvez ainsi boostez votre épargne qui est rémunérée au taux conventionnel en plus des 
                        rémunérations supplémentaires proposer par le bénéficiaire du financement.
                     </p>
                     <h3 className="font-weight-bold text-black text-left mt-40" data-aos="fade-right">
                        Développer votre réseau
                     </h3>
                     <p data-aos="fade-left" className='text-left mt-20'>
                        En proposant des offres de financement à partir de 3€, vous sortez de l'anonymat pour entrer en 
                        contact avec des entrepreneurs ou associés aux projets qui font les demandes de financement. 
                        Votre activisme auprès des porteurs de projet vous permettra de développer progressivement votre
                        réseau. Les évènements réseautage organisés par MicroCap sont les occasions pour se rencontrer et
                        renforcer les liens.
                     </p>
                  </div>
                  <p data-aos="fade-left" className='text-left mt-20'>
                     Attention : l'établissement financier place votre épargne habituellement sous sa 
                     responsabilité et à ses risques : votre épargne reste garantie au terme de la convention. 
                     Si vous faites personnellement une offre de financement, vous en porter le risque : 
                     les risque de perte en capital son ainsi à considérer.
                  </p>
               </div>
            </div>
         </div>
       </Typography>
    );
 }

export default SaveBoosting;