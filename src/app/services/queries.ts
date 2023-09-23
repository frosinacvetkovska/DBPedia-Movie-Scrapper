import { FilterDto } from "../model/dto/dto.filter";

export class Queries{
    static readonly PREFIXES: string = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX : <http://dbpedia.org/resource/>
    PREFIX dbpedia2: <http://dbpedia.org/property/>
    PREFIX dbpedia: <http://dbpedia.org/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX dbpediaOntology: <http://dbpedia.org/ontology/>
    PREFIX dbpprop: <http://dbpedia.org/property/>
    PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
    PREFIX dbr: <http://dbpedia.org/resource/>
    PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>`

    static readonly GET_FILMS: string =
    `${this.PREFIXES}
    SELECT DISTINCT ?film, ?filmName, ?filmGenre, ?abstract, ?director, ?directorName, ?filmPoster
    WHERE{
       ?film a dbpedia-owl:Film ;
            rdfs:label ?filmName ;
            dbo:genre ?genre ;
            dbpprop:director ?director ;
            dbo:thumbnail ?filmPoster ;
            dbo:abstract ?abstract .
      ?filmPosterURL foaf:thumbnail ?filmPoster .
      ?director dbpprop:name ?directorName .
      ?genre rdfs:label ?filmGenre .
      filter langMatches(lang(?abstract), "en")
      filter langMatches(lang(?filmName), "en")
      filter langMatches(lang(?filmGenre), "en")
      filter langMatches(lang(?directorName), "en").
    }
    LIMIT 30 
    `;

    public static GET_FILM_DETAILS_BY_URI(filmURI: string): string {
      return `${this.PREFIXES}
      SELECT DISTINCT ?film, ?filmName, ?filmGenre, ?abstract, ?director, ?directorName, ?filmPoster, ?wikiDataEntity
      WHERE{
      <${filmURI}>rdfs:label ?filmName ;
            dbo:genre ?genre ;
            dbpprop:director ?director ;
            dbo:thumbnail ?filmPoster ;
            dbo:abstract ?abstract ;
            owl:sameAs ?wikiDataEntity .
      ?filmPosterURL foaf:thumbnail ?filmPoster .
      ?director dbpprop:name ?directorName .
      ?genre rdfs:label ?filmGenre .
      filter langMatches(lang(?abstract), "en") 
      filter langMatches(lang(?filmName), "en")
      filter langMatches(lang(?filmGenre), "en")
      filter langMatches(lang(?directorName), "en").
      filter strStarts(str(?wikiDataEntity), 'http://www.wikidata.org/').
    }
    `;
  }

  public static GET_FILTERED_FILMS(filterDto: FilterDto): string {
    console.log(filterDto)

    return `${this.PREFIXES}
    SELECT DISTINCT ?film, ?filmName, ?filmGenre, ?abstract, ?director, ?directorName, ?filmPoster
    WHERE{
       ?film a dbpedia-owl:Film ;
            rdfs:label ?filmName ;
            dbo:genre ?filmGenre ;
            dbo:genre ?genre ;
            dbpprop:director ?director ;
            dbo:thumbnail ?filmPoster ;
            dbo:abstract ?abstract .
      ?filmPosterURL foaf:thumbnail ?filmPoster .
      ?director dbpprop:name ?directorName .
      ?genre rdfs:label ?filmGenre .
      filter langMatches(lang(?abstract), "en")
      filter langMatches(lang(?filmName), "en")
      filter langMatches(lang(?filmGenre), "en")
      filter langMatches(lang(?directorName), "en").
      ${filterDto.searchKeyWord != "" ?
      `FILTER CONTAINS(STR(?filmName), \"${filterDto.searchKeyWord}\")`: ""}
  }
  ${filterDto.sortBy !== "" ? "ORDER BY " + filterDto.sortBy + "(?filmName)" : ""}
    LIMIT ${filterDto.resultsCount !== 0 ? filterDto.resultsCount.toString() : "30"}
    `;
}

public static GET_FILM_DETAILS_FROM_WIKIDATA(uri: string) : string{
  return `SELECT ?prop ?val` + " WHERE {" + uri + " ?prop ?val }";
}

}