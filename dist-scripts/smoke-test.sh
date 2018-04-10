http=$(curl -s -o /dev/null -w "%{http_code}" -i -X GET  -H "Content-Type: application/json" "${JOURNAL_API_URL}")
echo "$http"

if [[ "$http" == 200 ]];
  then
  echo "Success"
else
  echo "Unsuccessful"
  exit 1
fi
