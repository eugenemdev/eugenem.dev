package dev.eugenem.article.parser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import dev.eugenem.article.model.Article;

public class ParseToArticle {

    private Article article = new Article();
    
    public Article parse(String text){

        int topTextCounter = 0;
        String topLine = "---";

        List<String> lines = Arrays.asList(text.split("\\r?\\n"));

        // for (String line: lines) {        
        for (int i = 0; i < lines.size(); i++) {
            // System.out.println(lines.get(i));            
            String line = lines.get(i);

            //it's begin of  post processing            
            if(line.equals(topLine) && topTextCounter == 0){
                ++topTextCounter;                                                
            } else  if (line.equals(topLine) && topTextCounter == 1){
                ++topTextCounter;                
                // we need to the end of post processing 
            } else if (topTextCounter == 2) {
                //put all other rows to body of our article
                
                // article.setBody(article.getBody() + System.lineSeparator() + line);  
                article.setBody(line);

            } else  if(topTextCounter == 1){

                CompilePattern compilePattern = new CompilePattern();                
                List<String> shablons = new ArrayList<>(); 
                                
                shablons.add(".*date:.*");
                shablons.add(".*title:.*");
                shablons.add(".*template:.*");
                shablons.add(".*thumbnail:.*");
                shablons.add(".*slug:.*");
                shablons.add(".*categories:.*");
                shablons.add(".*tags:.*");                

                shablons.forEach((shablon) ->{
                    var result = compilePattern.compile(line, shablon);
                    if (result){
                        if(shablon == ".*date:.*") article.setDate(line.replace("date: ", ""));
                        if(shablon == ".*title:.*")article.setTitle(line.replace("title: ", ""));
                        if(shablon == ".*template:.*")article.setTemplate(line.replace("template: ", ""));
                        if(shablon == ".*thumbnail:.*")article.setThumbnail(line.replace("thumbnail: ", ""));
                        if(shablon == ".*slug:.*")article.setSlug(line.replace("slug: ", ""));
                        if(shablon == ".*categories:.*")article.setCategories(line.replace("categories: ", ""));
                        if(shablon == ".*tags:.*")article.setTags(line.replace("tags: ", ""));
                    }
                });
                
            }        
        }

        return article;
            
    }
}
