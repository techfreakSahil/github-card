import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

export const useDownloader = () => {
  const card: any = document.getElementById("card");
  htmlToImage.toPng(card, { quality: 1 }).then(function (dataUrl): any {
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;
    const scale = Math.min(pdfHeight / imgHeight, pdfWidth / imgWidth);
    const finalWidth = imgWidth * scale;
    const finalHeight = imgHeight * scale;
    const leftMargin = (pdfWidth - finalWidth) / 2;
    pdf.addImage(
      dataUrl,
      "PNG",
      leftMargin,
      0,
      finalWidth,
      finalHeight,
      "alias",
      "FAST"
    );
    pdf.save(`github-card.pdf`);
  });
};
