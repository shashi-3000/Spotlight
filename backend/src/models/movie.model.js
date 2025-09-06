import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    genre: [
      {
        type: String,
      },
    ],
    releaseDate: {
      type: Date,
    },
    poster: {
      type: String, // URL of poster
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;


// import mongoose from "mongoose";

// const movieSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true, // for faster searches
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     genre: [
//       {
//         type: String,
//         enum: [
//           'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 
//           'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 
//           'History', 'Horror', 'Music', 'Mystery', 'Romance', 
//           'Science Fiction', 'Thriller', 'War', 'Western'
//         ] // Optional: restrict to valid genres
//       },
//     ],
//     releaseDate: {
//       type: Date,
//     },
//     poster: {
//       type: String, // URL of poster
//       validate: {
//         validator: function(v) {
//           return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
//         },
//         message: 'Poster must be a valid image URL'
//       }
//     },
//     // Additional useful fields
//     director: {
//       type: String,
//       trim: true,
//     },
//     cast: [
//       {
//         type: String,
//         trim: true,
//       }
//     ],
//     duration: {
//       type: Number, // in minutes
//       min: 1,
//     },
//     imdbId: {
//       type: String, // for TMDB/IMDB integration
//       unique: true,
//       sparse: true, // allows multiple null values
//     },
//     trailer: {
//       type: String, // YouTube URL
//     },
//     ratings: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5,
//     },
//     reviews: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//           required: true,
//         },
//         comment: {
//           type: String,
//           required: true,
//           trim: true,
//           minlength: 10,
//           maxlength: 1000,
//         },
//         rating: {
//           type: Number,
//           required: true,
//           min: 1,
//           max: 5,
//         },
//         createdAt: {
//           type: Date,
//           default: Date.now,
//         }
//       },
//     ],
//     // Useful for analytics
//     totalLikes: {
//       type: Number,
//       default: 0,
//     },
//     totalSaves: {
//       type: Number,
//       default: 0,
//     }
//   },
//   { 
//     timestamps: true,
//     // Add indexes for better query performance
//     indexes: [
//       { title: 'text', description: 'text' }, // for text search
//       { genre: 1 }, // for genre filtering
//       { releaseDate: -1 }, // for sorting by release date
//       { ratings: -1 }, // for sorting by ratings
//     ]
//   }
// );

// // Index for better search performance
// movieSchema.index({ title: 'text', description: 'text' });

// // Virtual for average rating calculation
// movieSchema.virtual('averageRating').get(function() {
//   if (this.reviews.length === 0) return 0;
//   const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
//   return Math.round((sum / this.reviews.length) * 10) / 10; // round to 1 decimal
// });

// // Virtual for total reviews count
// movieSchema.virtual('totalReviews').get(function() {
//   return this.reviews.length;
// });

// // Ensure virtual fields are serialized
// movieSchema.set('toJSON', { virtuals: true });
// movieSchema.set('toObject', { virtuals: true });

// // Pre-save middleware to update average rating
// movieSchema.pre('save', function(next) {
//   if (this.reviews && this.reviews.length > 0) {
//     const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
//     this.ratings = Math.round((sum / this.reviews.length) * 10) / 10;
//   }
//   next();
// });

// const Movie = mongoose.model("Movie", movieSchema);

// export default Movie;