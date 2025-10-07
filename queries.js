// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } });

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 13.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Catcher in the Rye" });


// ✅ Task 3: Advanced Queries

// 6. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// 7. Projection: Return only title, author, and price fields
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

// 9. Sort books by price (descending)
db.books.find().sort({ price: -1 });

// 10. Pagination: Show 5 books per page
db.books.find().skip(0).limit(5); // Page 1
db.books.find().skip(5).limit(5); // Page 2


// ✅ Task 4: Aggregation Pipeline

// 11. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

// 12. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

// 13. Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: {
        decade: {
          $concat: [
            { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
            "s"
          ]
        }
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { "_id.decade": 1 } }
]);


// ✅ Task 5: Indexing

// 14. Create an index on the title field
db.books.createIndex({ title: 1 });

// 15. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 16. Use explain() to demonstrate performance
db.books.find({ title: "The Hobbit" }).explain("executionStats");
