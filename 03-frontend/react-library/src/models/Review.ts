class ReviewModel {
  id: number;
  userEmail: string;
  date: string;
  rating: number;
  bookId: number;
  reviewDescription?: String;

  constructor(
    id: number,
    userEmail: string,
    date: string,
    rating: number,
    bookId: number,
    reviewDescription: String
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.date = date;
    this.rating = rating;
    this.bookId = bookId;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewModel;
