import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryColumn()
  imdbid: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column({ length: 10 })
  rated: string;

  @Column({ type: 'date' })
  released: Date;

  @Column({ type: 'int' })
  runtime: number;

  @Column({ length: 255 })
  genre: string;

  @Column({ length: 255 })
  director: string;

  @Column({ type: 'text' })
  writers: string;

  @Column({ type: 'text' })
  actors: string;

  @Column({ type: 'text' })
  plot: string;

  @Column({ length: 255 })
  languages: string;

  @Column({ length: 255 })
  country: string;

  @Column({ type: 'text' })
  awards: string;

  @Column({ length: 255 })
  poster: string;

  @Column({ type: 'int' })
  metascore: number;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  imdbrating: number;

  @Column({ type: 'int' })
  imdbvotes: number;

  @Column({ length: 50 })
  box_office: string;

  @Column({ length: 255 })
  production: string;

}

export default Movie; 