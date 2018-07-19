
const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://topswagcodesignalr.azurewebsites.net/graphHub")
    .build();

connection.on("LogWork", (work) => {
    console.log(work);
    myData.push(work);
    if (myData.length > 50) {
        myData.shift();
    }

    myChart.update();
});

connection.start().catch(err => console.error(err));
