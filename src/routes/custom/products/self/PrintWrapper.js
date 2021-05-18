import React from 'react';
import {PDFDownloadLink, Document, Page, View} from "@react-pdf/renderer";
import PrintAccountLogs from "Routes/custom/products/self/PrintAccountLogs";


const MyDoc = () => {
    return (
        <Document>
            <Page>
                <View>
                    {/*<PrintAccountLogs/>*/}
                    tgygugvyvygbn
                </View>
            </Page>
        </Document>
    );
};

const PrintWrapper = ({name}) => {
    const fileName = `${name}.pdf`;
    return (
        <PDFDownloadLink
            fileName={fileName}
            document={<MyDoc />}
        >
            {({blob, url, loading, error}) => {
                console.log("error =>", error);
                return (
                    <div>
                        Imprimer
                    </div>
                )
            }}

        </PDFDownloadLink>
    );
};

export default PrintWrapper;