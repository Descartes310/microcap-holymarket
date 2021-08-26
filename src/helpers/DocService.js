import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, callback = null) => {
    savePDF(html, { 
      paperSize: 'A3',
      fileName: `fiche_client.pdf`,
      margin: 50,
      height: '200px',
      padding: 16,
    }, callback())
  }

  printPdf = (html, callback = null) => {
    savePDF(html, {
      paperSize: 'A3',
      forcePageBreak: '.page-break',
      fileName: 'fiche_membre.pdf',
      margin: 50,
      height: '1200px',
      padding: 60,
    }, callback())
  }

}

const Doc = new DocService();
export default Doc;