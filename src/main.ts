import puppeteer from "puppeteer";

getBcb();

async function getBcb() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url =
    "https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?tipo=Comunicado&numero=41282";

  await page.goto(url, { waitUntil: "networkidle0" });

  const title = await page.$eval(".titulo-pagina", (e) =>
    e.textContent?.trim()
  );

  const paragraphs = await page.$$eval(
    ".ExternalClassBEC565BA27D94123B02DCFF6688C848C p",
    (elements) => {
      return elements.map((element) => element.innerText?.trim());
    }
  );

  const result = {
    title,
    paragraphs,
  };

  console.log(result);

  await browser.close();
}
