find client/public/Image -name "*.jpg" | while read f; do
  webp="${f%.jpg}.webp"
  if [ ! -f "$webp" ]; then
    cwebp "$f" -o "$webp"
    echo "✅ Converti: $f"
  fi
done
echo "✅ Terminé !"
