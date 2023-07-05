/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package util;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.JobName;
import javax.print.attribute.standard.MediaSizeName;
import javax.print.attribute.standard.OrientationRequested;
import javax.swing.JOptionPane;
import model.ModelVendas;
import model.ModelProdutos;
import controller.ControllerProdutos;
import controller.ControllerEmpresa;
import model.ModelVendasProdutos;
import model.ModelEmpresa;
/**
 *
 * @author Bruno
 */

public class Imprimir {
    ControllerProdutos controllerProdutos = new ControllerProdutos();
    ControllerEmpresa controllerEmpresa = new ControllerEmpresa();
    ModelProdutos modelProdutos = new ModelProdutos();
    ModelEmpresa modelEmpresa = new ModelEmpresa();
    
    public void imprimirCupom(ArrayList<ModelVendasProdutos> listaModelVendasProdutos, ModelVendas modelVendas){
            String dataF = "dd/MM/yyy";
            String horaF = "H:mm - a";
            String data, hora;
            //DATA
            java.util.Date tempoAtual = new java.util.Date();
            SimpleDateFormat formata = new SimpleDateFormat(dataF);
            data = formata.format(tempoAtual);
            //HORA
            formata = new SimpleDateFormat(horaF);
            hora = formata.format(tempoAtual);
            //CABEÇALHO DO CUPOM PRECISA PUXAR AS INFORMAÇÃO DA TABELA EMPRESA
            modelEmpresa = controllerEmpresa.getEmpresaController(1);
            //DADOS DO CUPOM
            String conteudoImprimir = "";
        
        for(int i = 0; i < listaModelVendasProdutos.size(); i++){
            modelProdutos = controllerProdutos.retornarProdutoController(listaModelVendasProdutos.get(i).getProduto());
            
            conteudoImprimir += 
                String.format(" %-5s", listaModelVendasProdutos.get(i).getProduto()) +
                String.format("%-26s", modelProdutos.getNome().substring(0, Math.min(modelProdutos.getNome().length(), 20))) +
                String.format("%-5s", listaModelVendasProdutos.get(i).getQuantidade()) +
                String.format("%-6s", listaModelVendasProdutos.get(i).getValor()) + "\n\r";
        }
        
        
           String linhaTracejada = String.format("%0" + (48) + "d", 0).replace('0', '-');
           String quebraLinha = System.lineSeparator();           
           String empresa = ""+modelEmpresa.getEmp_nome_fantasia();
           int tamanhoLinha = 48;
           int tamanhoString = empresa.length();
           int espacosAntes = (tamanhoLinha - tamanhoString) / 2;
           int espacosDepois = tamanhoLinha - tamanhoString - espacosAntes;
           empresa = String.format("%" + espacosAntes + "s%s%" + espacosDepois + "s", "", empresa, "");           
           String endereco = ""+modelEmpresa.getEmp_logradouro()+" "+modelEmpresa.getEmp_numero();
           String cnpj = ""+modelEmpresa.getEmp_cnpj();
           String cupom = "               CUPOM NAO FISCAL";
           String codDesc = String.format("%-16s%-16s%-16s", "COD", "DESCRICAO", "QTD. VALOR");
           String conteudo = ""+conteudoImprimir;
           String valorBruto = "VALOR BRUTO: "+modelVendas.getVenValorBruto()+"";
           String desconto   = "DESCONTO   : "+modelVendas.getVenDesconto()+"";
           String valorTotal = "VALOR TOTAL: "+modelVendas.getVenValorLiquido()+"";
           String emissao    = "Emissao    : "+data+" - " +hora+"";
           String agradecimento = "OBRIGADO E VOLTE SEMPRE";           
           int espacosEsquerda = (48 - agradecimento.length()) / 2;
           agradecimento = " ".repeat(espacosEsquerda) + agradecimento;

           String saida = String.format("%s%s%s%s%s%s%s%s%s%s%s%s%s%s", linhaTracejada, quebraLinha, empresa, quebraLinha, endereco, quebraLinha, cnpj, quebraLinha, linhaTracejada, quebraLinha, cupom, quebraLinha, linhaTracejada, quebraLinha);
           saida += String.format("%s%s%s%s%s%s", codDesc, quebraLinha, linhaTracejada, quebraLinha, conteudo, quebraLinha);
           saida += String.format("%s%s%s%s%s%s%s%s%s", linhaTracejada, quebraLinha, valorBruto, quebraLinha, desconto, quebraLinha, valorTotal, quebraLinha, linhaTracejada);
           saida += String.format("%s%s%s%s%s%s%s", quebraLinha, emissao, quebraLinha,quebraLinha, agradecimento, quebraLinha,quebraLinha);
           saida += linhaTracejada;        
        
        this.enviaImpressao(
                saida + "\f"               
        );              
    }
    
    public void enviaImpressao(String pText){
        try {
            InputStream prin = new ByteArrayInputStream(pText.getBytes());
            DocFlavor docFlavor = DocFlavor.INPUT_STREAM.AUTOSENSE;
            SimpleDoc documentoTexto = new SimpleDoc(prin, docFlavor, null);
            PrintService impressora = PrintServiceLookup.lookupDefaultPrintService();
            //BUSCA IMPRESSORA
            PrintRequestAttributeSet printerAttributes = new HashPrintRequestAttributeSet();
            printerAttributes.add(new JobName("impressao",null));
            printerAttributes.add(OrientationRequested.PORTRAIT);
            printerAttributes.add(MediaSizeName.ISO_A4);
            //TIPO DE FOLHA
            DocPrintJob printJob = impressora.createPrintJob();
            try {
                printJob.print(documentoTexto,(PrintRequestAttributeSet) printerAttributes);
                //TENTA IMPRIMIR
                JOptionPane.showMessageDialog(null,"Cheguei até aqui mas não tem impressora!!!", "Atenção",JOptionPane.WARNING_MESSAGE);
            } catch (Exception e) {
                JOptionPane.showMessageDialog(null,"Não Foi possível realizar a impressão!!!", "Erro",JOptionPane.ERROR_MESSAGE);
            }         
            
            prin.close();
            
        } catch (Exception e) {            
        }
    }



/*
// fim libs testes
import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import javax.swing.JOptionPane;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
// fim libs testes

    public void SalvarPdf(ArrayList<ModelVendasProdutos> listaModelVendasProdutos, ModelVendas modelVendas){
            String dataF = "dd/MM/yyy";
            String horaF = "H:mm - a";
            String data, hora;
            //DATA
            java.util.Date tempoAtual = new java.util.Date();
            SimpleDateFormat formata = new SimpleDateFormat(dataF);
            data = formata.format(tempoAtual);
            //HORA
            formata = new SimpleDateFormat(horaF);
            hora = formata.format(tempoAtual);
            //CABEÇALHO DO CUPOM PRECISA PUXAR AS INFORMAÇÃO DA TABELA EMPRESA
            modelEmpresa = controllerEmpresa.getEmpresaController(1);
            //DADOS DO CUPOM
            String conteudoImprimir = "";
        
        for(int i = 0; i < listaModelVendasProdutos.size(); i++){
            modelProdutos = controllerProdutos.retornarProdutoController(listaModelVendasProdutos.get(i).getProduto());
            
            conteudoImprimir += 
                    listaModelVendasProdutos.get(i).getProduto() + "\t" + 
                    modelProdutos.getProNome().substring(0, Math.min(modelProdutos.getProNome().length(), 20)) + "\t" +
                    listaModelVendasProdutos.get(i).getVenProQuantidade() +"\t"+
                    listaModelVendasProdutos.get(i).getVenProValor() + "\n\r";
        }  
            
           String linhaTracejada = String.format("%0" + (48) + "d", 0).replace('0', '-');
           String quebraLinha = System.lineSeparator();           
           String empresa = ""+modelEmpresa.getEmp_nome_fantasia();
           int tamanhoLinha = 48;
           int tamanhoString = empresa.length();
           int espacosAntes = (tamanhoLinha - tamanhoString) / 2;
           int espacosDepois = tamanhoLinha - tamanhoString - espacosAntes;
           empresa = String.format("%" + espacosAntes + "s%s%" + espacosDepois + "s", "", empresa, "");           
           String endereco = ""+modelEmpresa.getEmp_logradouro()+" "+modelEmpresa.getEmp_numero();
           String cnpj = ""+modelEmpresa.getEmp_cnpj();
           String cupom = "               CUPOM NAO FISCAL";
           String codDesc = "COD\tDESCRICAO\t\tQTD.\tVALOR";
           String conteudo = ""+conteudoImprimir;
           String valorBruto = "VALOR BRUTO: "+modelVendas.getVenValorBruto()+"\n\r";
           String desconto   = "DESCONTO   : "+modelVendas.getVenDesconto()+"\n\r";
           String valorTotal = "VALOR TOTAL: "+modelVendas.getVenValorLiquido()+"\n\r";
           String emissao    = "Emissao    : "+data+" - " +hora+"\n\r";
           String agradecimento = "       OBRIGADO E VOLTE SEMPRE";
           String saida = String.format("%s%s%s%s%s%s%s%s%s%s%s%s%s%s", linhaTracejada, quebraLinha, empresa, quebraLinha, endereco, quebraLinha, cnpj, quebraLinha, linhaTracejada, quebraLinha, cupom, quebraLinha, linhaTracejada, quebraLinha);
           saida += String.format("%s%s%s%s%s%s", codDesc, quebraLinha, linhaTracejada, quebraLinha, conteudo, quebraLinha);
           saida += String.format("%s%s%s%s%s%s%s%s%s", linhaTracejada, quebraLinha, valorBruto, quebraLinha, desconto, quebraLinha, valorTotal, quebraLinha, linhaTracejada);
           saida += String.format("%s%s%s%s%s", quebraLinha, emissao, quebraLinha, agradecimento, quebraLinha);
           saida += linhaTracejada;

            this.enviapdf(
                    saida + "\f"
            );              
        }
    
public void enviapdf(String pText) {
    try {
        // Obter o caminho da pasta de trabalho do usuário
        String desktopPath = System.getProperty("user.home") + "/Desktop/";

        // Configurar o documento PDF
        Document document = new Document(PageSize.A4);
        OutputStream pdfFile = new FileOutputStream(desktopPath + "arquivo.pdf");
        PdfWriter.getInstance(document, pdfFile);
        document.open();

        // Adicionar conteúdo ao documento
        Paragraph paragraph = new Paragraph(pText);
        paragraph.setAlignment(Element.ALIGN_LEFT);
        document.add(paragraph);

        // Fechar o documento
        document.close();
        pdfFile.close();

        JOptionPane.showMessageDialog(null, "Documento salvo em PDF com sucesso!", "Sucesso", JOptionPane.INFORMATION_MESSAGE);
    } catch (Exception e) {
        JOptionPane.showMessageDialog(null, "Não foi possível salvar o documento em PDF!", "Erro", JOptionPane.ERROR_MESSAGE);
    }
}
*/
    
}
