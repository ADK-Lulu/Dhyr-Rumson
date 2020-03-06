class ObjektSida extends Base {

  showModal() {
    // Needed to stop scrolling when the modal is shown
    this.shown = true;
    setTimeout(() => $('body').addClass('modal-open'), 0);
    this.render();
  }

  closeModal() {
    // Needed to stop scrolling when the modal is shown
    this.shown = false;
    setTimeout(() => $('body').removeClass('modal-open'), 0);
    this.render();
  }

  // Läs in databasen max
  async mount() {

    await sql(/*sql*/`USE max`);

    // Hämta alla bilder för aktuell SaljObjekt
    this.images = await sql(/*sql*/`
      SELECT * 
      FROM ObjektBilder 
      WHERE ObjektBilder.objektId = $objektSidaId
    `,
      {
        objektSidaId: this.objektId
      });

    // Hämta alla detaljer för aktuell SaljObjekt
    let details = await sql(/*sql*/`
      SELECT * 
      FROM SaljObjekt 
      JOIN ObjektProfiler 
      ON SaljObjekt.objektProfilId = ObjektProfiler.objektProfilId
      JOIN Adresser 
      ON SaljObjekt.adressId = Adresser.adressId
      JOIN Omraden 
      ON Omraden.omradeId = Adresser.omradeId
      WHERE SaljObjekt.objektId = $objektSidaId
    `,
      {
        objektSidaId: this.objektId
      });

    Object.assign(this, details[0]);

    // Hitta bilden som är framsidebild för aktuell SaljObjekt
    this.frontImage = this.images.find(front => front.framsidebild);
    //Hitta bilden för planritning
    this.planImage = this.images.find(plan => plan.planritning);
    //Hitta alla övriga bilder
    this.allPictures = this.images.filter(pictures => !pictures.framsidebild && !pictures.planritning);

  }

  render() {
    return /*html*/`
        <div class="row" route="/objekt-sida/${this.objektId}" page-title="Visa objekt ${this.objektId}">
          <div class="col-12">
            <img src="${this.frontImage.bildUrl}" class="img-fluid" alt="Frontbild ${this.objektId}">
            <h1 class="text-center">Objekttitel ${this.objektId}</h1> 
            <div class="col text-center sticky-top"><!--Kod för att knapparna ska vara centrerade och sticky när man scrollar.-->
              <div class="btn-group btn-group-lg" role="group" aria-label="Basic-example"> <!--Kod för button group -->
                <button type="button" class="btn btn-primary"><a href="#AllaBilder">Alla bilder</a></button>
                <button type="button" class="btn btn-primary"><a href="#Planritning">Planritning</a></button> 
                <button type="button" class="btn btn-primary"><a href="#FaktaOm">Fakta om</a></button> 
                <button type="button" class="btn btn-primary"><a href="#AnmälIntresse">Anmäl intresse</a></button> 
                <button type="button" class="btn btn-primary"><a href="#OmOmrådet">Om området</a></button>
                <button type="button" class="btn btn-primary" click="showModal">Dela</button>
              </div>
            </div>
            <!--Skriv kod här som inte har med knapparna att göra-->
            <!--Hårdfakta-ruta här-->
            <div class="col-12 py-2 align-middle">
              <div class="row bg-light">
                <div class="col">Storlek: ${this.kvm} kvm</div>
                <div class="col">Område: ${this.namn}</div>
              </div>
              <div class="row bg-light">
                <div class="col">Antal rum: ${this.antalRum}</div>
                <div class="col">Pris: ${this.pris} kr</div>
              </div>
            </div>

            <div class="col-12">
            <div class="col-4">
            <!-- Mäklarinfo här!-->
            </div>
            <div class="col-8">
            <p>${this.saljText}</p>
            </div>
            </div>

            <div class="row"><a id="AllaBilder"></a><!--Kod för bilderna-->
              ${this.allPictures.map(image => /*html*/`
                    <img class="img-fluid col-6" src="${image.bildUrl}">
                  `)}
            </div>
            <div class="col" id="Planritning"><!--Planritning-->
              <img src="${this.planImage.bildUrl}" class="img-fluid" alt="Planritning ${this.objektId}">
            </div>
            <div class="col mt-3" id="FaktaOm"><!--Fakta om-->
            <p>${this.objektBeskrivning}</p>
            </div>
            
            <!--Anmäl intresse-->
            <div class="container" id="AnmälIntresse">
              <div class="col-6 mt-2 float-right">
                <h4>Intresseanmälan:</h4>
                <form submit="collectFormData">
                  <div class="form-group">
                    <label class="w-100">Namn:
                      <input name="namn" type="text" class="form-control" placeholder="Ditt namn" required pattern=".{2,}">
                    </label>
                  </div>
                  <div class="form-group">
                    <label class="w-100">E-post:
                      <input name="epost" type="email" class="form-control" placeholder="Din e-postadress" required>
                      </label>
                    </div>
                    <input class="btn btn-primary float-right" type="submit" value="Skicka">
                  </form>
                </div> 
              </div>
            </div>
            <!--Om området-->
            <div class="row" id="OmOmrådet">
             <div class="col-6 mt-3"> 
              <h4>Om området:</h4>
              ${this.omradesBeskrivning}
             </div>
             <div class="col-6 mt-3">
              <img class="img-fluid" src="${this.bildUrl}">
             </div>
            </div>
            <div id="Dela">
              <div class="modal-backdrop ${this.shown ? 'show' : 'd-none'}"></div>
              <div class="modal ${this.shown ? 'd-block open' : ''}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Kopiera länk</h5>
                      <button type="button" class="close" click="closeModal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>${window.location.href}</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" click="closeModal">Stäng</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
    `;
  }

}