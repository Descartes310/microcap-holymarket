import React from 'react';
import Typography from '@material-ui/core/Typography';

const FarAwayWithMicrocap = () => {
    return (
       <Typography component="div" style={{ padding: 8 * 3 }}>
          <div className="showcase-card-block d-flex flex-column pb-0" style={{ padding: '5vh 10vw' }}>
           <div className='container'>
              <div className="row mb-70 flex-column intro">

                 <div style={{ margin: '5%' }}>
                    <h3 className="font-weight-bold text-black  text-justify" data-aos="fade-right">
                    Souscrire à un Pass Business Club pour devenir :
                    </h3>
                    <p data-aos="fade-left" className=' text-justify mt-20'>
                     Prestataires agrée sur la plateforme
                    </p>
                    <p data-aos="fade-left" className=' text-justify mt-20'>
                     Investisseur professionnel sur la plateforme
                    </p>
                    <p data-aos="fade-left" className=' text-justify mt-20'>
                     Partenaires MicroCap
                    </p>
                    <p data-aos="fade-left" className=' text-justify mt-20'>
                    Ambassadeur MicroCap
                    </p>


                    <h3 className="font-weight-bold text-black  text-justify mt-40" data-aos="fade-right">
                    Solliciter nos services pour accompagner votre démarche RSE
                    </h3>
                    <p data-aos="fade-left" className=' text-justify mt-20'>
                    Nous vous aidons construire et à mesurer votre impact social et environnemental
                    </p>

                    <h3 className="font-weight-bold text-black  text-justify mt-40" data-aos="fade-right">
                     Confier nous une mission d’intérêt social ou général qui vous incombe
                    </h3>
                    <p data-aos="fade-left" className=' text-justify mt-20'>
                     Vous êtes une institution qui agit contre la pauvreté ou en faveur de l’emploi, du développement économique, de
                     la coopération décentralisée ou de la solidarité internationale, MicroCap est un excellent canal pour la réalisation
                     et la visibilité de votre mission.
                    </p>

                 </div>
              </div>
           </div>
        </div>
       </Typography>
    );
 }

export default FarAwayWithMicrocap;