/**
 * TermsCondition Page
 */
import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class Terms extends Component {
  render() {
    return (
      <div className="terms-wrapper p-20" >
        <Helmet>
          <title>CONDITIONS GENERALES D’UTILISATION </title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        <div className="page-title d-flex align-items-center">
          <IconButton to="/" className="mr-15" aria-label="zmdi-arrow-left" component={Link}>
            <i className="zmdi zmdi-arrow-left"></i>
          </IconButton>
          <h2>CONDITIONS GENERALES D’UTILISATION</h2>
        </div>
        <div className="terms-conditions-rules">
          <RctCollapsibleCard customClasses="p-30">
            <h3>INTRODUCTION</h3>
            <p>Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du site et des services sur microcap.fr et de définir les conditions d’accès et d’utilisation des services par « l'Utilisateur ». Les présentes CGU sont accessibles sur le site à la rubrique  Conditions Générales d’Utilisation «CGU». </p>
            <h3>MENTIONS LEGALES</h3>
            <p>Les Conditions Générales d’Utilisation sont applicables au site internet accessible à l'adresse microcap.fr (ci-après désigné le «Site») exploité par la société A PLUS CONSEILS SAS, société par actions simplifiée, immatriculée au Registre du Commerce et des Sociétés de Bobigny sous le numéro 829 059 401, dont le siège est situé 7, Place du 11 Novembre 1018, 93000 Bobigny (ci-après désigné «A+»).  </p>
            <p>Directeur de publication</p>
            <p>Bernd STIEHL  Président contact@aplus-conseils.fr </p>
            <h3>PREREQUIS</h3>
            <p>L’Utilisateur confirme avoir lu, compris et accepté sans réserve l’intégralité des Conditions Générales d'Utilisation avant toute utilisation du Site et s’engage à les respecter.</p>
            <p>En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit de renoncer à l'accès des services proposés par le site.</p>
          </RctCollapsibleCard>
          <RctCollapsibleCard customClasses="p-30">
            <h2 className="heading">SOMMAIRE</h2>
            <ol>
              <li>Article 1 - Définitions</li>
              <li>Article 2 - Informations générales </li>
              <li>Article 3 - Présentation et contenu du Site - Propriété intellectuelle</li>
              <li>Article 4 - Accès au Site </li>
              <li>Article 5 – Inscription - Création d’un Compte Utilisateur </li>
              <li>Article 6 – Fonctionnement du Compte Utilisateur </li>
              <li>Article 7 - Responsabilité de l’Utilisateur lors de l’utilisation du Site </li>
              <li>Article 8 - Résiliation du Compte Utilisateur </li>
              <li>Article 9 - Protection des données personnelles </li>
              <li>Article 10 – Cookies </li>
              <li>Article 11 – Site internet de tiers</li>
              <li>Article 12 – Limitation de Responsabilité </li>
              <li>Article 13 – Divers </li>
              <li>Article 14 – Droit applicable - Litiges</li>
            </ol>
          </RctCollapsibleCard>
          <RctCollapsibleCard customClasses="p-30">
            <h2 className="heading">1. Définitions</h2>
            <p>Les termes et expressions visés ci-après signifient, lorsqu'ils sont précédés d'une lettre majuscule, pour les besoins de l'interprétation et de l'exécution des présentes Conditions Générales d'Utilisation : </p>
            <ol className="sub-order">
                <li>« Compte Utilisateur » : compte individuel de chaque Utilisateur encore désigné par l’expression « Espace Personnel Utilisateur ».</li>
                <li>« Conditions Générales d'utilisation » : conditions générales d'utilisation du Site applicables à l’ensemble des Utilisateurs</li>            
                <li>« Données » : ensemble des informations, contenus et données d'un Utilisateur, communiqués par ce dernier à A+ via le Site ou générés par l'utilisation du Site ou traités par A+</li>
                <li>@MicroCap : offre de services complète de la société A+ totalement distribuée et opérée depuis le site internet à l’adresse https://microcap.fr</li>
                <li>MicroCap : établissement de A+ Conseils dédié à la gestion du service MicroCap</li>
                <li>« Service MicroCap » : toute fonctionnalité du site ou processus du site MicroCap à la réalisation d’une opération apportant ou modifiant un avantage quelconque à un utilisateur du Site.</li>
                <li>« Formulaire Utilisateur » : formulaire accessible via le Site complété par l’Utilisateur, comprenant les informations nécessaires pour créer un Compte Utilisateur et accéder à l’intégralité des Services liés à ce dernier sur le Site. </li>
                <li>« Identifiants » : identifiant propre de chaque Utilisateur, correspondant à son adresse mail ou un login personnalisé, ainsi que le mot de passe de connexion permettant à l’Utilisateur de se connecter à son Compte Utilisateur.</li>
                <li>« Utilisateur » : toute personne utilisant le Site et justifiant d’un numéro utilisateur délivré pendant le processus d’inscription.</li>
                <li>« Membre MicroCap » : Utilisateur du site acceptant explicitement au cours de l’utilisation, d’adhérer à l’une des organisations formant le réseau MicroCap et justifiant d’un numéro d’adhésion délivré pendent l’opération d’adhésion.</li>
                <li>« Partenaire MicroCap » : Personne morale justifiant d’un contrat ou d’une convention d’une utilisation spécifique du site en vue d’apporter assistance à la réalisation d’un ou plusieurs service MicroCap.</li>
                <li>« Profil utilisateur » : catégorisation spécifique des utilisateurs en groupes justifiants des droits d’accès identique sur le site.</li>
                <li>« Visiteur » : toute personne accédant au Site et naviguant sur ses pages ne nécessitant aucun accès particulier, ou ayant commencé une inscription dont le niveau d’achèvement ne permet pas encore une utilisation correcte du site.</li>
                <li>« Boîte de messagerie » : contact sous la forme d’une adresse postale, adresse Email ou numéro de téléphone mobile, Numéro de contrat d’un partenaire MicroCap habilité à recevoir et à transmettre des correspondances des utilisateurs. </li>
            </ol>
            <h2 className="heading">2. Informations générales </h2>
            <p className="sub-order"><b>2.1.</b> Le Site est la propriété exclusive de A+ Conseils, éditeur du Site. L’accès au Site, son utilisation et son contenu sont soumis aux présentes Conditions Générales d’Utilisation. Tout accès et toute utilisation du Site entraîne l'acceptation expresse et sans réserve de l’ensemble des Conditions Générales d'Utilisation par le Visiteur ou l'Utilisateur.</p>
            <p className="sub-order"><b>2.2.</b> Les Conditions Générales d'Utilisation sont susceptibles d'être modifiées à tout moment. Le Visiteur et l'Utilisateur s'engage ainsi à vérifier les Conditions Générales d'Utilisation régulièrement et à s'y conformer. Toute modification fera l’objet d’une notification et d’une nouvelle acceptation explicite dans un délais de 15 jours à compter de la modification.</p>
            <p className="sub-order"><b>2.3.</b> Les Visiteurs et les Utilisateurs peuvent joindre MicroCap pour toute question relative au Site en écrivant un email à l’adresse infos@microcap.fr </p>

            <h2 className="heading">3. Présentation et contenu du Site - Propriété intellectuelle </h2>
            <p className="sub-order"><b>3.1.</b> A PLUS CONSEILS est seule titulaire de l'ensemble des droits de propriété intellectuelle afférents au Site (en ce compris tous ses contenus et fonctionnalités, sa structure générale, les logiciels, textes, savoir-faire, créations, dessins, illustrations, logos, éléments graphiques, marques et autres signes distinctifs, présentations, articles, fichiers disponibles en téléchargement, etc. et, plus généralement, tous éléments composant le Site) et à la base de données (en ce compris son architecture).</p>
            <p className="sub-order"><b>3.2.</b> Le Visiteur ou l’Utilisateur dispose d’un droit d’usage individuel et privé, non exclusif et non-cessible. La représentation, la reproduction ou l'exploitation de quelque manière que ce soit de tout ou d’une partie du Site, par quelque procédé que ce soit, ainsi que toute utilisation du contenu du Site à d'autres fins que la consultation individuelle et privée, la réalisation d’un service MicroCap, sans autorisation expresse et préalable de A PLUS CONSEILS, est interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.<p>Les Conditions Générales d'Utilisation n'emportent aucune cession ni aucune licence d'un quelconque droit de propriété intellectuelle au profit du Visiteur ou de l'Utilisateur en dehors du droit d'utiliser le Site conformément à l'ensemble des stipulations des Conditions Générales d'Utilisation. </p></p>
            <p className="sub-order"><b>3.3.</b> La société A PLUS CONSEILS se réserve le droit, sans information préalable des Visiteurs ou des Utilisateurs, de modifier ou d'améliorer les fonctionnalités existantes ou d'ajouter de nouvelles fonctionnalités. </p>

            <h2 className="heading">4. Accès au Site </h2>
            <p className="sub-order"><b>4.1.</b> Pour accéder au Site, le Visiteur ou l'Utilisateur doit disposer d'un accès internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge. </p>
            <p className="sub-order"><b>4.2.</b> A PLUS CONSEILS s'engage à mettre en œuvre tous les moyens dont il dispose raisonnablement pour que le Site soit accessible à tout moment, 24h sur 24h et 7 jours sur 7, à l'exception des périodes de maintenance. Toutefois, l'accès au Site et/ou aux Comptes Utilisateurs peut être ralenti ou momentanément interrompu pour des raisons techniques, défaillance ou perturbation des systèmes de télécommunication échappant au contrôle de A PLUS CONSEILS ou de nécessités liées au service et notamment afin d'assurer la maintenance des serveurs de A PLUS CONSEILS, la maintenance et la mise à jour du Site, etc., la responsabilité de cette dite société ne pouvant nullement être engagée de ce fait.</p>
            <p className="sub-order"><b>4.3.</b> A+ peut suspendre ou limiter temporairement l'accès au Site et ce, immédiatement et sans notification préalable, lorsque la société constate une faille de sécurité de nature à compromettre gravement la sécurité des Données et/ou de son serveur. </p>
            <p className="sub-order"><b>4.4.</b> Il appartient à chaque Visiteur ou Utilisateur de prendre toutes les mesures afin d'assurer la protection des Données et des logiciels stockés sur son ordinateur, notamment contre la contamination par les virus, ou spywares (logiciels espions) qui pourraient être introduits par des tiers via internet. </p>
            <p className="sub-order"><b>4.5.</b> Pour accéder aux services, l’Utilisateur devra s'identifier à l'aide de son nom d’utilisateur et de son mot de passe qui lui seront communiqués après son inscription et qui sont strictement personnels. A ce titre, il s’en interdit toute divulgation. Dans le cas contraire, il restera seul responsable de l’usage qui en sera fait.</p>

            <h2 className="heading">5. Inscription - Création d’un Compte Utilisateur </h2>
            <p className="sub-order"><b>5.1.</b> Afin d'utiliser les Services MicroCap, au-delà de la simple navigation sur le Site, tout nouvel Utilisateur doit préalablement remplir le Formulaire Utilisateur afin de créer un Compte Utilisateur.</p>
            <p className="sub-order"><b>5.2.</b> Les réponses aux questions non précédées d’un astérisque sont facultatives et sans conséquence pour l’ouverture du Compte Utilisateur. En revanche, à défaut de communiquer toutes les informations obligatoires dans le Formulaire et signalées par un astérisque, la création du Compte Utilisateur ne peut être finalisée.</p>
            <p className="sub-order"><b>5.3.</b> La finalisation de la création d’un Compte Utilisateur nécessite que l’Utilisateur consulte et accepte préalablement les Conditions Générales d'Utilisation, qui peuvent être sauvegardées et/ou imprimées, en cochant la case prévue à cet effet (reproduisant la phrase "Je certifie avoir lu et accepté les conditions générales d'Utilisation du site microcap.fr de la société A+), puis valide son formulaire d'inscription.</p>
            <p className="sub-order"><b>5.4.</b> Aucune création de Compte Utilisateur ne peut être finalisée si les Conditions Générales d'Utilisation ne sont pas acceptées préalablement par chaque Utilisateur au moment de l’ouverture du Compte Utilisateur. Cette validation implique l'acceptation sans restriction ni réserve de l'intégralité des Conditions Générales d'Utilisation. </p>
            <p className="sub-order"><b>5.5.</b> A+ confirme la création du Compte Utilisateur en adressant une demande de confirmation à la boite de messagerie communiquée dans le formulaire d’inscription. Le message électronique ou message postale de confirmation adressé par A+ comporte un code à renseigner par l’Utilisateur qui permettra de valider définitivement la création de son Compte Utilisateur.</p>

            <h2 className="heading">6. Fonctionnement du Compte Utilisateur </h2>
            <p className="sub-order"><b>6.1.</b> La validation du Formulaire Utilisateur sur le Site crée un Compte Utilisateur avec les informations communiquées dans le Formulaire Utilisateur.</p>
            <p className="sub-order"><b>6.2.</b> L’Utilisateur est seul responsable de l’ensemble des Données qu’il renseigne, fournit et garantit à A+ que les informations et Données sont exactes, précises, complètes et systématiquement mises à jour et qu'elles ne portent atteinte à aucun droit de tiers ni enfreignent aucune législation ou règlementation en vigueur.</p>
            <p className="sub-order"><b>6.3.</b> L'Utilisateur est seul responsable de la perte et/ou des dommages résultant d’éléments et/ou informations transmis à A+ incomplets ou mensongers.</p>
            <p className="sub-order"><b>6.4.</b> L'accès au Compte Utilisateur s’effectue à l'aide des Identifiants à partir de tout ordinateur fixe ou portable, ou tout appareil mobile disposant d’une connexion internet (Smartphone, Tablette).</p>
            <p className="sub-order"><b>6.5.</b> L’Utilisateur est seul responsable de l'accès à son Compte Utilisateur, de l'utilisation et de la confidentialité des Identifiants.</p>
            <p className="sub-order"><b>6.6.</b> Les Identifiants ne peuvent être utilisés que pour permettre l'accès au Compte Utilisateur et ce, afin de garantir la sécurisation des Données.</p>
            <p className="sub-order"><b>6.7.</b> L’Utilisateur est seul responsable de toute connexion et transmission de Données effectuées en utilisant le Compte Utilisateur, notamment si l’Utilisateur prend le risque de pré-enregistrer les Identifiants sur leur(s) ordinateur(s), permettant ainsi la connexion automatique au Compte Utilisateur.</p>
            <p className="sub-order"><b>6.8.</b> L’Utilisateur devra informer la société A+, sans délai et par courrier électronique à l’adresse infos@microcap.fr , s'il constate toute utilisation non autorisée (supposée ou avérée) de son Compte Utilisateur, une faille ou violation (supposée ou avérée) de sécurité liée notamment à la communication volontaire ou non, à la perte ou au détournement d'Identifiants afin que A+ puisse prendre sans délai toute mesure adaptée en vue de faire remédier à la faille de sécurité.</p>
            <p className="sub-order"><b>6.9.</b> En cas de perte ou de détournement d'un Identifiant ou d'un mot de passe, l’Utilisateur devra adresser un email à l’adresse infos@microcap.fr afin que A+ lui attribue un nouvel Identifiant ou mot de passe.</p>

            <h2 className="heading">7. Responsabilité de l’Utilisateur lors de l’utilisation du Site </h2>
            <p className="sub-order"><b>7.1.</b> L'Utilisateur garantit A+ contre toute réclamation ou action de tiers à ce titre et A+ ne pourra en aucun cas être tenu responsable de tous dommages directs ou indirects découlant de l'utilisation par l'Utilisateur du Site.</p>
            
            <h2 className="heading">8. Résiliation du Compte Utilisateur </h2>
            <p className="sub-order"><b>8.1.</b> Résiliation d’un Compte Utilisateur par A+: <br/>Sous réserve d'en informer l’Utilisateur par sa boite de messagerie , A+ peut procéder à la fermeture de tout Compte Utilisateur, immédiatement, sans préavis ni indemnité, en cas de :
            <ul className="sub-order">
                <li>utilisation illicite, tentative d'utilisation illicite ou même complicité d'utilisation illicite du Site et/ou du Compte Utilisateur, notamment en cas d'utilisation en violation d'une quelconque loi ou règlement en vigueur ou portant atteinte à un droit quelconque de tiers, de contrefaçon, violation de droits de la personnalité, atteinte à des données à caractère personnel, etc…</li>
                <li>utilisation du Site et/ou du Compte Utilisateur en violation de l'une quelconque des stipulations des Conditions Générales d'Utilisation ;</li>
                <li>cessation de l'exploitation du Site par A+ pour quelque raison que ce soit ; et</li>
                <li>inactivité du Compte Utilisateur pendant une période ininterrompue de six (6) mois.</li>
            </ul>
            En cas d’inactivité du Compte Utilisateur pendant une période ininterrompue de six (6) ans, A+ adressera une correspondance à l’Utilisateur afin de l’inviter à se connecter à son Compte Utilisateur s’il ne souhaite pas que ledit Compte Utilisateur soit résilié.
            </p>
            <p className="sub-order"><b>8.2.</b> Résiliation d'un Compte Utilisateur par un Utilisateur :<br/> L’Utilisateur peut résilier, à tout moment, son Compte Utilisateur en initialisant une demande depuis son compte utilisateur. Une demande de confirmation lui sera adresse dans sa boite de correspondance. Cette action de suppression est irrévocable. En cas d’oubli ou de perte des Identifiants, l’Utilisateur peut également résilier son Compte Utilisateur en adressant une demande en ce sens par courrier électronique à l’adresse infos@microcap.fr.</p>
        

            <h2 className="heading">9. Protection des données personnelles  </h2>
            <p className="sub-order"><b>9.1.</b> Les Données et informations transmises par l'Utilisateur dans le Formulaire Utilisateur ou lors de la navigation sur le Site comportent des données à caractère personnel. Ces Données à caractère personnel, notamment:<br/>
            <ul className="sub-order">
                <li>les informations décrites à l'article 5 des Conditions Générales d’Utilisation ;</li>
                <li>toutes informations, données ou contenus fournis ou générés par l'Utilisateur lors de l'utilisation du Site (ex : adresse IP), de l'implémentation de tout formulaire en ligne, du contact du support ;</li>    
            </ul> 
            font l'objet d'un traitement automatisé et sont enregistrées dans la base de données de A+.<br/>
            A+ est responsable du traitement de ces données. 
            </p>
            <p className="sub-order"><b>9.2.</b> L'Utilisateur accepte expressément que ces données personnelles soient collectées, enregistrées, utilisées et fassent l'objet d'un traitement informatique, dans les conditions définies ci-dessous.</p>
            <p className="sub-order"><b>9.3.</b>  Les Données sont destinées à A+, aux autres Utilisateurs possédant un Compte Utilisateur, ainsi qu’à l’hébergeur du Site.</p>
            <p className="sub-order"><b>9.4.</b>  Les Données personnelles sont nécessaires aux fins de :  <br/>
                <ul>
                    <li>création du Compte Utilisateur ; </li>
                    <li>assurer le traitement, le suivi et la gestion des Utilisateurs et des Comptes Utilisateurs ;</li>
                    <li>analyse des profils et besoins des Utilisateurs conformément à l'objet du Site ;</li>
                    <li>amélioration de la pertinence des recherches ; </li>
                    <li>permettre de contacter les Utilisateurs dans le cadre des Services ;</li>
                    <li>assistance des Utilisateurs dans l’utilisation du Site ; </li>
                    <li>exécution des Services. </li>
                </ul>
            </p>
            <p className="sub-order"><b>9.5.</b>  Les Données personnelles fournies sont aussi utilisées par A+ pour communiquer à l'Utilisateur des informations relatives au Site ou à A+ et/ou à son service A+, notamment ses mises à jour, des newsletters, offres, actualités, informations commerciales, etc. ou à des offres de partenaires A+. </p>
            <p className="sub-order"><b>9.6.</b> L'Utilisateur accepte expressément que A+ puisse utiliser ses données personnelles à des fins commerciales notamment pour la prospection directe d'éventuels Utilisateurs.</p>
            <p className="sub-order"><b>9.7.</b> L'Utilisateur autorise expressément A+ à diffuser en ligne les Données personnelles le concernant en les rendant anonymes et à les communiquer, sans les rendre anonymes, à tout Utilisateur afin de pouvoir être contacté.</p>
            <p className="sub-order"><b>9.8.</b>A défaut de collecte de ces Données personnelles, A+ ne peut assurer la bonne réalisation de ces finalités et certains services pourront être inaccessibles.</p>
            <p className="sub-order"><b>9.9.</b> Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 telle que modifiée par la législation nationale par Loi n°2004-801 du 6 août 2004 et les règlements européens, l'Utilisateur dispose, s’agissant des données traitées le concernant :<br/>
            <ul>
                <li>d'un droit d'accès ; </li>
                <li>d'un droit de rectification ; </li>
                <li>d'un droit de suppression et d'effacement ; </li>
                <li>du droit de demander une limitation du traitement de ces données ; </li>
                <li>du droit de s’opposer, pour des motifs légitimes, à ce que les données personnelles le concernant fassent l'objet d'un traitement ou, sans motif, à ce qu'elles soient utilisées à des fins de prospection commerciale ;</li>
                <li>du droit à la portabilité de ces données ; </li>
                <li>du droit de définir des directives relatives au sort de ses données à caractère personnel après sa mort;</li>
                <li>du droit d'introduire une réclamation auprès d’une autorité de contrôle, à savoir la CNIL, qu’il pourra exercer à tout moment par voie postale à l’adresse suivante : A PLUS CONSEILS, Service MicroCap, 7, Place du 11 Novembre 1918, 93000 BOBIGNY ou en adressant un email à l'adresse suivante : serviceadherents@microcap.fr, en indiquant son numéro adhérant, ses nom, prénom et coordonnées. S’agissant de droits strictement personnels, ils ne pourront être exercés que par leur titulaire justifiant de son identité.></li>
            </ul>
            Il est précisé que dans l'hypothèse où l'Utilisateur demanderait la suppression de ses Données ou s’opposerait à la collecte de ses Données personnelles, les Services, dont les Données personnelles sont nécessaires à leur exécution, pourront cesser et le Compte Utilisateur clôturé. <br/>
            Pour en savoir plus, consultez vos droits sur le site de la CNIL &lt;https://www.cnil.fr/fr/comprendre-vos-droits&gt;.
            </p>
            <p className="sub-order"><b>9.10.</b>  Les Données à caractère personnel traitées par MicroCap sont conservées par MicroCap dans des conditions raisonnables de sécurité. MicroCap fera ses meilleurs efforts pour préserver la sécurité des Données personnelles des Utilisateurs et notamment empêcher qu'elles soient déformées, endommagées ou accessibles à des tiers non autorisés. </p>
            <p className="sub-order"><b>9.11.</b>  MicroCap est autorisé à communiquer des Données personnelles de l 'Utilisateur lorsque ces Données doivent être dévoilées par suite d'une injonction judiciaire ou administrative ou encore lorsque leur communication est nécessaire à MicroCap pour assurer sa défense dans le cadre d'une procédure judiciaire ou administrative. </p>
            <p className="sub-order"><b>9.12.</b>  Les Données personnelles des Utilisateurs seront conservées pendant une période de trois (3) mois à compter de la suppression du Compte Utilisateur ou du dernier contact positif de l’Utilisateur.</p>

            <h2 className="heading">10. Cookies  </h2>
            <p className="sub-order"><b>10.1.</b> L'Utilisateur est informé que lors de ses visites sur le Site, un cookie peut, sous réserve de son accord, s'installer sur son logiciel de navigation. Un cookie est un traceur déposé sur le terminal de l'Utilisateur qui sert à enregistrer des informations relatives à la navigation de celui-ci sur le Site. </p>
            <p className="sub-order"><b>10.2.</b> Le cookie est destiné à l'enregistrement des informations relatives à la navigation de l'Utilisateur sur le Site et à faciliter et améliorer les utilisations ultérieures du Site (personnalisation du contenu du Site, mémorisation des login et mot de passe, géolocalisation et préférences de recherches). La durée de conservation de ces informations est d'un (1) an à compter du consentement de l'Utilisateur.</p>
            <p className="sub-order"><b>10.3.</b> L'Utilisateur peut s'opposer à l'enregistrement des cookies et changer les paramètres de son navigateur en cliquant sur le lien relatif au paramétrage des cookies. Cependant, dans ce cas, MicroCap ne pourra garantir le bon fonctionnement de l'intégralité des fonctionnalités du Site. </p>
            <p className="sub-order"><b>10.4.</b> La poursuite par l'Utilisateur de sa navigation sur le Site vaut accord du dépôt de cookies sur son terminal. </p>
            <p className="sub-order"><b>10.5.</b> L’Utilisateur pourra désactiver ce cookie par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation</p>

           <h2 className="heading">11. Site internet de tiers </h2>
           <p>Le Site peut contenir des liens vers des sites internet tiers et des liens vers des réseaux sociaux qui n'appartiennent pas ni ne sont contrôlés par MicroCap. MicroCap n’assume aucune responsabilité quant au contenu, à la politique de confidentialité ou aux pratiques des sites internet de tiers. En utilisant le Site, l'Utilisateur accepte que la responsabilité de MicroCap ne puisse être engagée en raison de son utilisation des sites internet tiers et réseaux sociaux tiers.</p>

           <h2 className="heading">12. Limitation de Responsabilité  </h2>
            <p className="sub-order"><b>12.1.</b> MicroCap ne pourra en aucun cas être tenu responsable envers quiconque de tout dommage direct, indirect, incident, spécial ou consécutif, incluant, sans limitation, les virus, les défauts ou dysfonctionnements d'ordinateur, la perte de clientèle ou de profits, de revenus, de chances, de données, toutes erreurs, omissions, pertes ou tous retards, que le dommage soit causé de quelque façon que ce soit à l'occasion, en relation ou à la suite de l'utilisation du Site de tout contenu ou autre élément accessible ou téléchargé depuis le Site.</p>
            <p className="sub-order"><b>12.2.</b> MicroCap ne garantit pas, de quelque manière que ce soit, que le Site soit exempt de tout code informatique malveillant, y compris mais non exclusivement de virus informatiques. La responsabilité de MicroCap ne pourra être engagée en cas de dommages ou de suppression de données causés par des codes informatiques malveillants.</p>
            <p className="sub-order"><b>12.3.</b> MicroCap ne garantit ni l'entière exactitude ni l'exhaustivité ou le caractère actuel de toute donnée ou information accessible depuis le Site ou publiées sur ceux-ci par MicroCap ou un Utilisateur, en ce compris les profils et informations relatives aux Utilisateurs, ni l'accès sans interruption à celui-ci et toute garantie, explicite, implicite ou légale, y compris toute garantie de qualité ou d'adéquation à un usage spécifique, est expressément exclue.</p>
            <p className="sub-order"><b>12.4.</b> MicroCap ne garantit non plus que les mises à jour ou modifications effectuées par un Utilisateur sur son Compte Utilisateur ou une publication d’un Utilisateur soient mises en ligne instantanément et l’Utilisateur reconnait et accepte expressément que ces mises en ligne peuvent, en particulier pour des raisons techniques, prendre un certain temps. </p>
            <p className="sub-order"><b>12.5.</b> MicroCap se réserve le droit d'agir en justice contre tout Utilisateur contrevenant afin d'obtenir la réparation du préjudice qui lui est propre.</p>

            <h2 className="heading">13. Divers </h2>
            <p className="sub-order"><b>13.1.</b> Dans l'hypothèse où l'une des quelconques stipulations des Conditions Générales d'Utilisation serait considérée comme étant nulle, illégale ou inopposable par une juridiction compétente ou par une autorité ayant compétence pour ce faire, ou en application d'un texte législatif ou réglementaire en vigueur, la stipulation contractuelle concernée sera supprimée sans que la validité, ni l'opposabilité des autres stipulations des Conditions Générales d'Utilisation en soient affectées.</p>
            <p className="sub-order"><b>13.2.</b>Le fait pour l’une des parties de ne pas exercer un droit ou de ne pas réclamer à l'autre l’exécution d’une obligation incombant à cette dernière en vertu des Conditions Générales d'Utilisation, ne vaudra pas renonciation à l'exercice de ce droit ou à l'exécution de cette obligation, non plus qu'exemption de la partie défaillante de l'accomplissement à l'avenir de ses obligations. </p>

            <h2 className="heading">14. Droit applicable - Litiges </h2>
            <p className="sub-order"><b>14.1.</b> Le droit applicable aux Conditions Générales d’Utilisation est le droit français. Elles sont rédigées en langue française. Dans le cas où elles seraient traduites en une ou plusieurs autres langues, seul le texte français fera foi en cas de litige.</p>
            <p className="sub-order"><b>14.2.</b>Toute réclamation ou litige découlant de la validité, de l’interprétation ou de l’exécution des Conditions Générales d'Utilisation sera soumis aux tribunaux compétents du ressort de la Cour d'appel de Paris, dans les conditions de droit commun.</p>



          </RctCollapsibleCard>
          
        </div>
      </div>
    );
  }
}
