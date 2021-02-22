import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, name, date) => {
    savePDF(html, { 
      paperSize: 'A3',
      fileName: `releve_de_compte-${name}'-du-${date}.pdf`,
      margin: 50,
      height: '200px',
      padding: 16,
    })
  }
}

const Doc = new DocService();
export default Doc;