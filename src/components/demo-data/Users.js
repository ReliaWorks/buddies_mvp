export default userSampleData = [
  {
    firstName: 'Peter',
    age: '35',
    location: {
      city: 'San Francisco, California',
      distance: '2 miles'
    },
    profileImages: [
      'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fpeter.png?alt=media&token=5b0f6836-0cf6-42ce-bd8f-6c99d8b8a19e',
      'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2FPeter2.png?alt=media&token=debe4efa-7318-46fb-a47f-18ab9e34e9b1',
      'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2FPeter3.JPG?alt=media&token=7844831f-a89b-439b-9e66-0774432d527f',
    ],
    activities: [
      {
        name: 'Running',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984'
      },
      {
        name: 'Swimming',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Fswim2.png?alt=media&token=7d3c824a-55f9-45bd-8f81-b944e3e4ffcd'
      },
    ],
    affiliations: [
      {
        name: 'GGTC',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2FGGTCKayleigh.png?alt=media&token=c210a96d-57e1-4451-b617-8235188f2b55'
      },
      {
        name: 'Bay Club',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2FBayClubKayleigh.png?alt=media&token=2180371c-6286-449f-83e7-9366d74ee0e4'
      },
      {
        name: 'NRC',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2FNikeRunClub.jpg?alt=media&token=c4c31ca9-18d1-4a60-a7e0-a2a7d60b5baa'
      },
      {
        name: 'NRC',
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
      'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Foscar.jpg?alt=media&token=26ba8d11-7e2e-4620-a0b9-ea0dba5080ef'
    ],
    activities: [
      {
        _id: Math.round(Math.random() * 1000000),
        name: 'Crossfit',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Fcrossfit1x.png?alt=media&token=26fae214-f184-4fa8-8094-775c96e91262'
      },
      {
        _id: Math.round(Math.random() * 1000000),
        name: 'Rock Climbing',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Fswim2.png?alt=media&token=7d3c824a-55f9-45bd-8f81-b944e3e4ffcd'
      }
    ],
    affiliations: [
      {
        name: 'GGTC',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2FGGTCKayleigh.png?alt=media&token=c210a96d-57e1-4451-b617-8235188f2b55'
      },
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
      'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fkayleigh.jpg?alt=media&token=2c0af25f-c4d1-4691-b27a-a6ef0f63e011',
      'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fkayleigh2.jpg?alt=media&token=6518a380-374d-4f29-b40a-0ddcfcad79c7'
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
      {
        name: 'GGTC',
        icon: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2FGGTCKayleigh.png?alt=media&token=c210a96d-57e1-4451-b617-8235188f2b55'
      },
    ],
    description: 'nubia nostra, per inceptos himenaeos. Quisque sed tellus et urna semper aliquet vitae tincidunt odio. Etiam convallis, metus quis faucibus interdum, purus libero accumsan augue',
  },
];
