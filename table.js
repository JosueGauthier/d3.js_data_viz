var Tabulate = function (data) {
    d3.select(".info").select('table').remove();

    var table = d3.select('.info').append('table').attr('class', 'styled-table');

    const rowTemplate = ({ Name = data['Name'], Type = data['Type'], Price = data['Retail_Price'], Engine = data['Engine_Size'], Horsepower = data['Horsepower'], Cyl = data['Cyl'] }) => {
        return `
        <tr>
            <td>Name</td>
            <td>${Name}</td>
        </tr>

        <tr>
            <td>Type</td>
            <td>${Type}</td>
        </tr>
        <tr>
            <td>Price</td>
            <td>${Price} €</td>
        </tr>
        <tr>
            <td>Engine</td>
            <td>${Engine} l</td>
        </tr>
        <tr>
            <td>Horsepower</td>
            <td>${Horsepower} HP</td>
        </tr>
        <tr>
            <td>Cylinder</td>
            <td>${Cyl}</td>
        </tr>
       
            `;
    };

    table
        .selectAll("tbody")
        .data([data])
        .enter()
        .append("tbody")
        .html(rowTemplate);



    return table;
}

