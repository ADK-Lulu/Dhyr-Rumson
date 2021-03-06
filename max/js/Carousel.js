class Carousel extends Base {

  async mount() {
    await this.getRandomObject();
  }

  async getRandomObject() {
    // Tar fram framsides bilder till alla objekt och de visas random.
    this.karusellObjekt = await sql(/*sql*/`
      SELECT *
      FROM ObjektBilder
      JOIN SaljObjekt
      ON SaljObjekt.objektId = ObjektBilder.objektId
      JOIN Adresser
      ON SaljObjekt.adressId = Adresser.adressId
      WHERE framsidebild = true
      
    `,);
  }

  render() {
    let toRender = /*html*/`
      <div class="col-12 mt-4">
        <div class="text-center bg-white">
          <div id="start-carousel" class="carousel slide d-inline-block" data-ride="carousel">
            <ol class="carousel-indicators bg-secondary rounded">
              ${this.karusellObjekt.map((karusellObjektet, index) => /*html*/`
                <li data-target="#start-carousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
                `)}
            </ol>
            <div class="carousel-inner">
              ${this.karusellObjekt.map((karusellObjektet, index) => /*html*/`
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <div class="d-flex justify-content-center">
                  <a href="/objekt-sida/${karusellObjektet.objektId}">
                    <img class="img-fluid crop-image" src="${karusellObjektet.bildUrl}">
                    <div class="carousel-caption">
                      <h3 class="text-dark">${karusellObjektet.gata} ${karusellObjektet.gatunummer}</h3>
                      <h4 class="text-dark">${app.formateraPris(karusellObjektet.pris)} kr</h4>
                    </div>
                    <div class="bg-white-50"></div>
                  </a>
                </div>
              </div>
              `)}
            </div>
            <a class="carousel-control-prev" href="#start-carousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#start-carousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
`;
    // Starta carousel
    setTimeout(() => $('#start-carousel').carousel('cycle'));
    // Börjar hämta en ny kategori
    this.getRandomObject();
    // returnera html till render
    return toRender;
  }
}