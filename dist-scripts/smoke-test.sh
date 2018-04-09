http=$(curl -s -o /dev/null -w "%{http_code}" -i -X GET  -H "Content-Type: application/json" -d '{"candidateId": "someCandidateId","faults":[{"id":"juncSpeed","faultsNo":10,"isSerious":false,"isDangerous":false}]}' "${JOURNAL_API_URL}")
echo "$http"

if [[ "$http" == 200 ]];
  then
  echo "Success"
else
  echo "Unsuccessful"
  exit 1
fi


http=$(curl -s -o /dev/null -w "%{http_code}" -i -X GET  -H "Content-Type: application/json" -d '{"candidateId": "someCandidateId","faults":[{"id":"juncSpeed","faultsNo":10,"isSerious":false,"isDangerous":false}]}' https://931gfw2iw6.execute-api.eu-west-1.amazonaws.com/alpha/?email=test@test.com
