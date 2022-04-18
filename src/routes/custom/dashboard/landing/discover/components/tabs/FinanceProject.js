import React from 'react';
import Typography from '@material-ui/core/Typography';

const FinanceProject = () => {
   return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '5vh 10vw' }}>
           <div className='container'>
              <div className="row mb-70 flex-column intro">

                 <div style={{ margin: '5%' }}>
                    <h3 className="font-weight-bold text-black text-left" data-aos="fade-right">
                     La bourse de financement
                    </h3>
                    <p data-aos="fade-left" className='text-left mt-20'>
                     Un éditeur simplifier de projet est intégré à la plateforme MicroCap. Les projets suivent 
                     un process qui abouti à une demande de financement publiée sur la bourse de financement. 
                     Le dispositif permet à chaque associé au projet de faire une demande de financement de son apport.
                    </p>


                    <h3 className="font-weight-bold text-black text-left mt-40" data-aos="fade-right">
                     Des liens forts pour les moments importants, notre principe de solidarité financière
                    </h3>
                    <p data-aos="fade-left" className='text-left mt-20'>
                     Chaque entrepreneur associé dans un projet de création ou reprise d'entreprise peut obtenir un financement
                     individuel sur MicroCap pour renforcer son apport personnel. En effet, MicroCap investi sur les entrepreneurs, non
                     pas sur les projets. Nous croyons en l'humain et à sa capacité à se réinventer.
                    </p>

                    <h3 className="font-weight-bold text-black text-left mt-40" data-aos="fade-right">
                    Nos ateliers et soirées réseautage
                    </h3>
                    <p data-aos="fade-left" className='text-left mt-20'>
                     En proposant des offres de financement à partir de 3€, les membres du réseau sortent de l'anonymat et deviennent
                     acteurs du succès des entrepreneurs qu'ils soutiennent. L'activisme de chacun auprès des porteurs de projet lui
                     permettra de développer progressivement son réseau. Nous organisons régulièrement les évènements réseautage
                     qui donnent l'occasion de se rencontrer et renforcer les liens.
                    </p>

                 </div>
              </div>
           </div>
        </div>
      </Typography>
   );
}

export default FinanceProject;