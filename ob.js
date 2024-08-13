const data = {
    "orderData": {
        "data": {
            "id": "22745903B73826204",
            "status": "COMPLETED",
            "payment_source": {
                "paypal": {
                    "email_address": "sb-cjyjd32101231@personal.example.com",
                    "account_id": "HV3RBFBATSMK6",
                    "account_status": "VERIFIED",
                    "name": {
                        "given_name": "John",
                        "surname": "Doe"
                    },
                    "address": {
                        "country_code": "US"
                    }
                }
            },
            "purchase_units": [
                {
                    "reference_id": "default",
                    "shipping": {
                        "name": {
                            "full_name": "John Doe"
                        },
                        "address": {
                            "address_line_1": "1 Main St",
                            "admin_area_2": "San Jose",
                            "admin_area_1": "CA",
                            "postal_code": "95131",
                            "country_code": "US"
                        }
                    },
                    "payments": {
                        "captures": [
                            {
                                "id": "7KB24154C63796138",
                                "status": "COMPLETED",
                                "amount": {
                                    "currency_code": "USD",
                                    "value": "100.00"
                                },
                                "final_capture": true,
                                "seller_protection": {
                                    "status": "ELIGIBLE",
                                    "dispute_categories": [
                                        "ITEM_NOT_RECEIVED",
                                        "UNAUTHORIZED_TRANSACTION"
                                    ]
                                },
                                "seller_receivable_breakdown": {
                                    "gross_amount": {
                                        "currency_code": "USD",
                                        "value": "100.00"
                                    },
                                    "paypal_fee": {
                                        "currency_code": "USD",
                                        "value": "4.96"
                                    },
                                    "net_amount": {
                                        "currency_code": "USD",
                                        "value": "95.04"
                                    }
                                },
                                "links": [
                                    {
                                        "href": "https://api.sandbox.paypal.com/v2/payments/captures/7KB24154C63796138",
                                        "rel": "self",
                                        "method": "GET"
                                    },
                                    {
                                        "href": "https://api.sandbox.paypal.com/v2/payments/captures/7KB24154C63796138/refund",
                                        "rel": "refund",
                                        "method": "POST"
                                    },
                                    {
                                        "href": "https://api.sandbox.paypal.com/v2/checkout/orders/22745903B73826204",
                                        "rel": "up",
                                        "method": "GET"
                                    }
                                ],
                                "create_time": "2024-08-09T12:57:35Z",
                                "update_time": "2024-08-09T12:57:35Z"
                            }
                        ]
                    }
                }
            ],
            "payer": {
                "name": {
                    "given_name": "John",
                    "surname": "Doe"
                },
                "email_address": "sb-cjyjd32101231@personal.example.com",
                "payer_id": "HV3RBFBATSMK6",
                "address": {
                    "country_code": "US"
                }
            },
            "links": [
                {
                    "href": "https://api.sandbox.paypal.com/v2/checkout/orders/22745903B73826204",
                    "rel": "self",
                    "method": "GET"
                }
            ]
        },
        "statusCode": 200,
        "success": true
    }
}