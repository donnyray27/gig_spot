# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

genres = [
  "Alternative",
  "Blues",
  "Classical",
  "Country",
  "Dance",
  "Easy Listening",
  "Electronic",
  "European (Folk/Pop)",
  "Hip Hop/Rap",
  "Indie Pop",
  "Inspirational/Gospel",
  "Jazz",
  "Latin",
  "New Age",
  "Opera",
  "Pop",
  "R&B/Soul",
  "Reggae",
  "Rock",
  "World"
]

genres.each do |genre|
  Genre.create(name: genre)
end

instruments = [
  "Piccolo",
  "Flute",
  "Recorder",
  "Oboe",
  "English Horn",
  "Clarinet",
  "Bassoon",
  "Contrabasson",
  "Soprano Saxophone",
  "Alto Saxophone",
  "Tenor Saxophone",
  "Baritone Saxophone",
  "Bagpipe",
  "Harmonica",
  "Accordion",
  "Horn in F",
  "B♭ Cornet",
  "C Trumpet",
  "B♭ Trumpet",
  "Trombone",
  "Tenor Trombone",
  "Bass Trombone",
  "Tuba",
  "B♭ Tuba",
  "Timpani",
  "Glockenspiel",
  "Vibraphone",
  "Xylophone",
  "Marimba",
  "Drums",
  "Snare Drum",
  "Bass Drum",
  "Triangle",
  "Cymbal",
  "Tambourine",
  "Vocal - Soprano",
  "Vocal - Alto",
  "Vocal - Tenor",
  "Vocal - Baritone",
  "Vocal - Bass",
  "Piano",
  "Harpsichord",
  "Organ",
  "Pipe Organ",
  "Banjo",
  "Classical Guitar",
  "Acoustic Guitar",
  "Electric Guitar",
  "Harp",
  "Ukulele",
  "Bass Guitar",
  "Violin",
  "Viola",
  "Violoncello",
  "Contrabass",
  "Double Bass"
]

instruments.each do |instrument|
  Instrument.create(name: instrument)
end

User.create(
first_name: "Donathan",
last_name: "Raymond",
email: "drayman27@msn.com",
role: "admin",
avatar: "bass_guitar_hero_by_karate_chop.jpg"
)
