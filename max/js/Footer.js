class Footer extends Base {
  async mount() {
    await app.kopSida.search();
  }

  render() {
    return /*html*/ `
  <footer class="footer row">
  <div class="col-12 col-md-6 col-lg-4">
    <h1 class="h1-responsive">Dhyr & Rumson</h1>
    <h5>Adress</h5>
    <p>Liljeholmsvägen 123, 12345 Liljeholmen</p>
    <a class="btn btn-secondary mb-4" href="mailto:dhyrochrumson@email.com">Maila oss</a>
    <p>&copy; 2020 Dhyr & Rumson All rights reserved.</p>
  </div>
  
    <div class="col-6 col-md-3">
      <h4>Om oss</h4>

      <ul class="list-group">
        <li>
          <a class="text-muted" href="/om-oss">Hitta mäklare</a>
        </li>

        <li>
          <a class="text-muted" href="/kontakt-sida">Kontakta oss</a>
        </li>

        <li>
          <a class="text-muted" href="/salj-sida">Värdera din bostad</a>
        </li>
      </ul>
    </div>

    <div class="col-6 col-md-3">
      <h4>Information</h4>

      <ul class="list-group">
        <li>
          <a class="text-muted" href="#">Användarvillkor</a>
        </li>

        <li>
          <a class="text-muted" href="#">Personuppgiftspolicy</a>
        </li>

        <li>
          <a class="text-muted" href="#">Sitemap</a>
        </li>
      </ul>
    </div>

    <div class="col-12 col-md-12 col-lg-2">
      <h4 class="mb-3">Följ oss på:</h4>
      <ul class="list-group">
        <li>
         <span class="mx-3"> <a href="http://www.facebook.com" target="_blank"><img src="/images/iconer/facebook.png"></a></span>
          <a href="http://www.instagram.com" target="_blank"><img src="/images/iconer/instagram.png"></a>
        </li>
      </ul>
    </div>
  
</footer>
    `;
  }
}
