require 'open-uri'

categories = [
  {
    name: "スポーツ",
    image: "app/assets/images/sport.jpg",
  },
  {
    name: "音楽",
    image: "app/assets/images/music.jpg",
  },
  {
    name: "芸術・写真",
    image: "app/assets/images/art.jpg",
  },
  {
    name: "自然・アウトドア",
    image: "app/assets/images/outdoor.jpg",
  },
  {
    name: "料理・飲食",
    image: "app/assets/images/gourmet.jpg",
  },
  {
    name: "旅",
    image: "app/assets/images/travel.jpg",
  },
  {
    name: "インドア・文化",
    image: "app/assets/images/indoor.jpg",
  },
  {
    name: "制作・テクノロジー",
    image: "app/assets/images/technology.jpg",
  },
  {
    name: "ファッション・デザイン",
    image: "app/assets/images/fashion.jpg",
  },
  {
    name: "ゲーム",
    image: "app/assets/images/game.jpg",
  },
  {
    name: "ペット・動物",
    image: "app/assets/images/pet.jpg",
  },
  {
    name: "学習",
    image: "app/assets/images/study.jpg",
  },
  {
    name: "その他",
    image: "app/assets/images/question.jpg",
  },
];

categories.each do |category|
  new_category = Category.create(name: category[:name])
  new_category.image.attach(io: File.open(Rails.root.join(category[:image])),filename: File.basename(category[:image]))
end