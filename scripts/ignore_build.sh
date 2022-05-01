echo "VERCEL_ENV: $VERCEL_ENV"

if ! [[ "$VERCEL_ENV" == "production" ]] ; then
  echo "🛑 - Build cancelled - Not a production env"
  exit 0;
fi
echo "✅ - Production env"

exit 1;