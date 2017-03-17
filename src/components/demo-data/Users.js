export default userSampleData = [
  {
    firstName: 'Peter',
    age: '35',
    location: {
      city: 'San Francisco, California',
      distance: '2 miles'
    },
    profileImages: [
      { url: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fpeter.png?alt=media&token=5b0f6836-0cf6-42ce-bd8f-6c99d8b8a19e' },
      { url: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2FPeter2.png?alt=media&token=debe4efa-7318-46fb-a47f-18ab9e34e9b1' },
      { url: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2FPeter3.JPG?alt=media&token=7844831f-a89b-439b-9e66-0774432d527f' },
    ],
    activities: [
      {
        name: 'Running',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984'
      },
      {
        name: 'Walking',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984'
      }
    ],
    affiliations: [
      {
        name: 'Golden Gate Tri Club',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2Fggtc.png?alt=media&token=7126aaf1-2e91-4be5-bc0a-af442696edb3'
      },
      {
        name: 'Nike Run Club',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2FNikeRunClub.jpg?alt=media&token=c4c31ca9-18d1-4a60-a7e0-a2a7d60b5baa'
      },
    ],
    description: 'Looking for a running buddy',
  },
  {
    firstName: 'Oscar',
    age: '42',
    location: {
      city: 'Panama City, Panama',
      distance: '4381 miles'
    },
    profileImages: [
      { url: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Foscar.jpg?alt=media&token=26ba8d11-7e2e-4620-a0b9-ea0dba5080ef' }
    ],
    activities: [
      {
        _id: Math.round(Math.random() * 1000000),
        name: 'Biking',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Fbiking_icon.png?alt=media&token=d0793482-6ab4-4382-831b-29996b6db6cc'
      },
      {
        _id: Math.round(Math.random() * 1000000),
        name: 'Running',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984'
      }
    ],
    affiliations: [
      {
        name: 'Bay Club',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2Fbayclub_logo2.png?alt=media&token=fa345ef2-88a4-40d1-9f92-e2f6f80a1794'
      }
    ],
    description: 'Looking for a biking buddy',
  },
  {
    firstName: 'Kayleigh',
    age: '31',
    location: {
      city: 'Oakland, California',
      distance: '15 miles'
    },
    profileImages: [
      { url: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fkayleigh.jpg?alt=media&token=2c0af25f-c4d1-4691-b27a-a6ef0f63e011' },
      { url: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fkayleigh2.jpg?alt=media&token=6518a380-374d-4f29-b40a-0ddcfcad79c7' }
    ],
    activities: [
      {
        _id: Math.round(Math.random() * 1000000),
        name: 'Hiking',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2FHiking_icon.png?alt=media&token=5b882368-82ca-4605-b0ea-ecf38fa5607d'
      },
      {
        _id: Math.round(Math.random() * 1000000),
        name: 'Running',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984'
      }
    ],
    affiliations: [
    ],
    description: 'Looking for a dancing buddy',
  },
];
