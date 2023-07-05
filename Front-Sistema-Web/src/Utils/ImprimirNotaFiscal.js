export function imprimirNotaFiscal(divid, title) {
    var conteudo = document.getElementById(divid);
    if (conteudo != null) {
        conteudo = document.getElementById(divid).innerHTML;
        var frameBoleto = document.createElement('iframe');
        frameBoleto.name = "frameBoleto";
        frameBoleto.style.position = "absolute";
        frameBoleto.style.top = "-1000000px";
        document.body.appendChild(frameBoleto);
        var frameDoc = frameBoleto.contentWindow ? frameBoleto.contentWindow : frameBoleto.contentDocument.document ? frameBoleto.contentDocument.document : frameBoleto.contentDocument;
        frameDoc.document.open();
        frameDoc.document.write(`<html><head><title>${title}</title>`);
        frameDoc.document.write('</head><body>');
        frameDoc.document.write(conteudo);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frameBoleto"].focus();
            window.frames["frameBoleto"].print();
        }, 500);
        setTimeout(function () {
            document.body.removeChild(frameBoleto);
        }, 2000);
        return false;
    }

}