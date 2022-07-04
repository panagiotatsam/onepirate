#!/bin/bash
SERVER_KEY='AAAAuZdBYRA:APA91bENv6HUi95hsGd_MyGHZGpS7GHm_7OOwSEvhv1X3rGCVLMkCTyNTBB5cU7zWKE6pclW-v_esYtt0Vpd53ceotLKqR_2-nJfX-2ZWTwP1rAiRdboHUZ_oTWxaS1J1AfvKSmfsbmU'
DEVICE_REG_TOKEN='de2dStBPyckf9QMRyxX6OL:APA91bFaUHz4wb79jU71I3ryH39rUt_iru7ZWjvRSgCwPkpbGfz7BvOC0f7ut9u8Nj3l3WwobDGEMDe00Bh7TLMJ0Cv1Xpi10aAsQXmzPh8z5bpf5lnw_lGMQvbYIPrTXsqWb9SFLdVl'

CMD=$(cat <<END
curl -X POST -H "Authorization: key=$SERVER_KEY" -H "Content-Type: application/json"
   -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "/itwonders-web-logo.png",
    }
  },
  "to": "$DEVICE_REG_TOKEN"
}' https://fcm.googleapis.com/fcm/send
END
)

echo $CMD && eval $CMD