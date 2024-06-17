-- Create the movies table
CREATE TABLE IF NOT EXISTS movies (
  imdbID VARCHAR(20) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  rated VARCHAR(10),
  released DATE,
  runtime INT, -- Changed to INT to store minutes directly
  genre VARCHAR(255),
  director VARCHAR(255),
  writers TEXT,
  actors TEXT,
  plot TEXT,
  languages VARCHAR(255), -- Changed from 'language' to avoid reserved word conflict
  country VARCHAR(255),
  awards TEXT,
  poster VARCHAR(255),
  metascore INT,
  imdbRating DECIMAL(3,1),
  imdbVotes INT,
  box_office VARCHAR(50),
  production VARCHAR(255)
);


CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password_salt VARCHAR(255),  -- Make salt nullable
  password_hash VARCHAR(255),  -- Make hashed password nullable
  googleId VARCHAR(255) UNIQUE, -- Add googleId field for OAuth users
  firstName VARCHAR(100) NOT NULL, -- Add firstName field
  lastName VARCHAR(100) NOT NULL  -- Add lastName field
);

CREATE TABLE Watch_History (
  watch_history_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES Users(user_id), -- Replace Users with your actual user table name
  imdbid VARCHAR(20) NOT NULL,
  watch_date DATE,  -- Changed data type to DATE
  feeling VARCHAR(255), -- Optional: User's feeling about the movie
  watched_with VARCHAR(255),
  location VARCHAR(255),
  platform VARCHAR(255), -- Optional: Platform where the movie was watched
  rewatched BOOLEAN, -- Optional: Flag indicating if the movie was a rewatch
  notes TEXT -- Optional: User's notes about the movie or experience
);

CREATE TABLE User_Rating (
  user_rating_id SERIAL PRIMARY KEY,
  watch_history_id INT NOT NULL REFERENCES Watch_History(watch_history_id),
  rating_value INT,
  review TEXT, -- Optional: User's full review of the movie
  recommended BOOLEAN, -- Optional: Flag indicating if the user recommends the movie
  tags VARCHAR(255) -- Optional: User-assigned tags for the movie (e.g., comedy, drama)
);

CREATE TABLE Watchlist (
  watchlistID SERIAL PRIMARY KEY, -- Assuming watchlistID is not auto-incrementing
  user_id INT NOT NULL,
  imdbid VARCHAR(20) NOT NULL,
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (imdbid) REFERENCES Movies(imdbid),
  UNIQUE (user_id, imdbid)  -- Unique constraint on user and movie combination
);

CREATE TABLE User_Profile (
  user_profile_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES Users(user_id),  -- Links profiles to users
  date_of_birth DATE,
  profile_picture VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  bio TEXT,
  languages VARCHAR(255),
  country VARCHAR(255),
  CONSTRAINT unique_user_profile UNIQUE (user_id)  -- Optional, allows only one profile per user
);


-- Insert data into the movies table
INSERT INTO movies (
  imdbID,
  title,
  year,
  rated,
  released,
  runtime,
  genre,
  director,
  writers,
  actors,
  plot,
  languages,
  country,
  awards,
  poster,
  metascore,
  imdbRating,
  imdbVotes,
  box_office,
  production
)
VALUES 
(
  'tt1160419', -- Dune
  'Dune',
  2021,
  'PG-13',
  '2021-10-22',
  155, -- Runtime in minutes
  'Action, Adventure, Drama',
  'Denis Villeneuve',
  'Jon Spaihts, Denis Villeneuve, Eric Roth',
  'Timothée Chalamet, Rebecca Ferguson, Zendaya',
  'A noble family becomes embroiled in a war for control over the galaxy''s most valuable asset while its heir becomes troubled by visions of a dark future.', -- Correctly escaped single quotes
  'English, Mandarin',
  'United States, Canada',
  'Won 6 Oscars. 173 wins & 294 nominations total',
  'https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1.SX300.jpg',
  74,
  8.0,
  835661,
  '$108,897,830',
  'N/A'
),
(
  'tt12844910', -- Pathaan
  'Pathaan',
  2023,
  'Not Rated',
  '2023-01-25',
  146, -- Runtime in minutes
  'Action, Adventure, Thriller',
  'Siddharth Anand',
  'Shridhar Raghavan, Abbas Tyrewala, Siddharth Anand',
  'Shah Rukh Khan, Deepika Padukone, John Abraham',
  'An Indian agent races against a doomsday clock as a ruthless mercenary, with a bitter vendetta, mounts an apocalyptic attack against the country.',
  'Hindi, English, Russian',
  'India',
  '10 wins & 44 nominations',
  'https://m.media-amazon.com/images/M/MV5BYTgzNjBjYTctOGJiZi00MTliLTk0YzYtNDJmYTQyMDdkMjQ5XkEyXkFqcGdeQXVyNTkzNDQ4ODc@._V1.SX300.jpg',
  47,
  5.8,
  156159,
  '$17,487,476',
  'N/A'
);