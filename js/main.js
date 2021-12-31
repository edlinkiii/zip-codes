const pluck_data = (json_in) => {
    const json_out = [];

    json_in.kml.Document.Folder.Placemark.forEach((p) => {
        let zipCode = p.ExtendedData.SchemaData.SimpleData
                        .filter((s) => s['@name'] === 'GEOID10')
                        .reduce((old_val, new_val) => old_val + new_val['#text'], '');

        let coords = [];

        if(p.Polygon)
            coords = p.Polygon.outerBoundaryIs.LinearRing.coordinates.split(',0.0 ');

        else if(p.MultiGeometry)
            coords = p.MultiGeometry.Polygon
                        .map((mp) => mp.outerBoundaryIs.LinearRing.coordinates.split(',0.0 '));

        let zip_obj = {
            ZipCode: zipCode,
            Coordinates: coords
        };

        c++

        json_out.push(zip_obj);
    });

    return json_out;
}

const log_it = (msg) => {
    document.querySelector('#output').textContent = msg;
    console.log(msg);
}

const build_link = (name, data, text='Download', type='text/plain') => {
    let file = new File([data], name, {type: type});

    let a = document.createElement('a');
        a.textContent = text;
        a.download = name;
        a.href = window.URL.createObjectURL(file);

    document.body.appendChild(a);
}

const start = Date.now();

let c = 0;

fetch('data/cb_2018_us_zcta510_500k.kml')
.then((ret) => { log_it('File read complete.'); return ret; })

.then((response) => response.text())
.then((ret) => { log_it('File content converted to text.'); return ret; })

.then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
.then((ret) => { log_it('File content parsed as XML.'); return ret; })

.then((xml_str) => xml2json(xml_str))
.then((ret) => { log_it('File content converted to JSON string.'); return ret; })

.then((json_str) => JSON.parse(json_str.replace(/undefined/g,'')))
.then((ret) => { log_it('File content parsed as JSON.'); return ret; })

.then((json) => pluck_data(json))
.then((ret) => { log_it('Data plucked.'); return ret; })

.then((ret) => { log_it('Conversion complete.'); return ret; })

.then((data) => build_link('zip_coords.json', JSON.stringify(data), 'Download', 'application/json'))
.then(() => log_it('Download ready.'))

.catch(err => console.error(err))

.finally(() => {
    const end = Date.now();
    console.log(`Processed ${c} zip codes in ${Math.floor((end - start) / 1000)} seconds`);
});
