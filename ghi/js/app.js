window.addEventListener('DOMContentLoaded', async () => {



    function createCard(name, description, pictureUrl, starts, ends, location) {
        return `
          <div class="card">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
              <p class="card-text">${description}</p>
              <p class="card-footer">${starts} - ${ends}</p>
            </div>
          </div>
        `;
      }

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {

        console.log('bad response')

      } else {
        const data = await response.json();

        const columns = document.querySelectorAll('.col');
        let columnIndex = 0;

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const name = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const starts = new Date(details.conference.starts).toLocaleDateString();
            const ends = new Date(details.conference.ends).toLocaleDateString();
            const location = details.conference.location.name;
            const html = createCard(name, description, pictureUrl, starts, ends, location);

            const column = columns[columnIndex];
            column.innerHTML += html;

            columnIndex = (columnIndex + 1) % columns.length;

          }
        }

      }
    } catch (e) {
      console.error(e)
    }

  });
