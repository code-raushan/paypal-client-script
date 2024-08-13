window.paypal
    .Buttons({
        style: {
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
        },
        message: {
            amount: 100,
        },
        async createOrder() {
            try {
                // const response = await fetch("http://localhost:4000/api/v1/checkouts?gateway=PAYPAL", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     // use the "body" param to optionally pass additional order information
                //     // like product ids and quantities
                //     body: JSON.stringify({
                //         amount: 100
                //     }),
                // });

                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YmNhYTI5NC1kNThhLTRmZWMtOGU1MC1jM2NlZWZmODgwNmEiLCJlbWFpbCI6InJhdXNoYW5rdW1hcjI3OTg3OEBnbWFpbC5jb20iLCJpYXQiOjE3MjM0ODQ1NDgsImV4cCI6MTcyMzU3MDk0OH0.OAbylAOAdLj45NA4CS67qQ_nD0CbjskaSCIf6dAws-s'


                const response = await fetch('http://localhost:4000/api/v1/checkouts?type=SUBSCRIPTION&itemId=78a13f47-d61f-49b9-ac9e-a2082be61e4f', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'cf-ipcountry': 'US'
                    }
                });

                const orderData = await response.json();

                console.log({ orderData })

                if (orderData.data.id) {
                    return orderData.data.id;
                }
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            } catch (error) {
                console.error(error);
                // resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
            }
        },
        async onApprove(data, actions) {
            console.log({ data, actions })
            try {
                const response = await fetch(`http://localhost:4000/api/v1/checkouts/paypal/capture/${data.orderID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const orderData = await response.json();
                console.log({ orderData })

                console.log({ x: orderData.data })

                const od = orderData.data;
                console.log({ od })
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you message

                const errorDetail = orderData?.data?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per
                    // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
                } else if (!orderData.data.purchase_units) {
                    throw new Error(JSON.stringify(orderData));
                } else {
                    //(3) Successful transaction -> Show confirmation or thank you message
                    //Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                        od.purchase_units[0].payments.captures[0] ||
                        od.purchase_units[0].payments.authorizations[0];
                    resultMessage(
                        `Transaction ${transaction.status}: ${transaction.id}<br>
          <br>See console for all available details`
                    );
                    console.log(
                        "Capture result",
                        od,
                        JSON.stringify(od, null, 2)
                    );
                }
            } catch (error) {
                console.error(error);
                resultMessage(
                    `Sorry, your transaction could not be processed...<br><br>${error}`
                );
            }
        },
    })
    .render("#paypal-button-container");

function resultMessage(message) {
    const messageDiv = document.getElementById('result-message');
    if (messageDiv) {
        messageDiv.innerHTML = message;
    } else {
        console.log(message);
    }
}