class NotFound extends Base{


render() {
    return /*html*/`
      <div class="row" route="404" title-page="Missing page">
        <div class="col">
        <h1 class="not-found large-text text-center">--404--
        <br>Oops, verkar vara tomt här....<br>
        </h1>
        <h2 class="not-found text center mb-5">Det kan vara så att vi inte har hunnit fixa det pga COVID-19, försök igen om 2 veckor.</h2>
         <a class="text-muted" href="/"><p class="text-center">Klicka här för att återvända till startsidan.</p></a> 
        </div>
      </div>
      `
  }
}