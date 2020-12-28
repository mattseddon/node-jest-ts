import Resource from "../../typings/Resource";
import Movies from "../../api/Movies";

const _getOriginalMovie = () => {
    return {
        name: "Jaws",
        rating: 9
    };
};

const _getSequelMovie = () => {
    return {
        name: "Jaws: The Revenge",
        rating: 1.4
    };
};

describe("GIVEN the Movies API and two movies", () => {
    const movies: Resource = new Movies();

    const originalMovie: object = _getOriginalMovie();
    const sequelMovie: object = _getSequelMovie();

    describe("WHEN we create a classic original movie", () => {
        const movie: object = movies.create(originalMovie);
        it("THEN an object is returned", () => {
            expect(movie).toEqual(originalMovie);
        });
    });

    describe("WHEN we create an awful sequel to cash in", () => {
        const movie: object = movies.create(sequelMovie);
        it("THEN an object is returned", () => {
            expect(movie).toEqual(sequelMovie);
        });
    });

    describe("WHEN we try to find all the movies", () => {
        const found: object = movies.findMany();
        it("THEN the expected objects are returned in an array", () => {
            expect(found).toEqual([originalMovie, sequelMovie]);
        });
    });
});

describe("GIVEN the Movies API instantiated with two movies", () => {
    const originalMovie: object = _getOriginalMovie();
    const sequelMovie: object = _getSequelMovie();

    const movies: Resource = new Movies([originalMovie, sequelMovie]);

    describe("WHEN we try to find all the movies", () => {
        const found: object = movies.findMany();
        it("THEN the expected objects are returned in an array", () => {
            expect(found).toEqual([originalMovie, sequelMovie]);
        });
    });
});
