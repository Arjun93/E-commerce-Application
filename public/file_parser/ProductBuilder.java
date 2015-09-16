import java.io.*;
import java.util.*;

public class ProductBuilder{

   public static void main(String args[])throws IOException{

      //System.out.println("hello");
      File inputFile = new File("Project2Data.txt");
      File outputFile = new File("Product.txt");

      outputFile.createNewFile();

      BufferedReader myBufferedReader = new BufferedReader(new java.io.FileReader(inputFile));
      BufferedWriter myBufferedWriter = new BufferedWriter(new FileWriter(outputFile));
      String currentLine;
      String stringToBeWritten="";
      
      LinkedList idLinkedList = new LinkedList();
      LinkedList asinLinkedList = new LinkedList();
      LinkedList titleLinkedList = new LinkedList();
      LinkedList groupLinkedList = new LinkedList();
      LinkedList categoriesLinkedList = new LinkedList();

      while((currentLine = myBufferedReader.readLine())!=null) {
         
         if(currentLine.contains("Id:")) {
            String currentId = currentLine.substring(currentLine.lastIndexOf(" "));
            idLinkedList.add(currentId);
         }
         if(currentLine.contains("ASIN:")) {
            String currentASIN = currentLine.substring(currentLine.lastIndexOf(" "));
            asinLinkedList.add(currentASIN);
         }
         if(currentLine.contains("title:")) {
            String currentTitle = currentLine.substring(currentLine.indexOf(": ")+1);
            titleLinkedList.add(currentTitle);
         }
         if(currentLine.contains("group:")) {
            String currentGroup = currentLine.substring(currentLine.lastIndexOf(": ")+1);
            groupLinkedList.add(currentGroup);
         }
         if(currentLine.contains("categories:")) {
            String currentCategories = currentLine.substring(currentLine.lastIndexOf(" ")+1);;
            categoriesLinkedList.add(currentCategories);
         }
      }

      for(int i=0; i<idLinkedList.size();i++) {
         stringToBeWritten = idLinkedList.get(i)+ "\t"+asinLinkedList.get(i)+ "\t"+titleLinkedList.get(i)+"\t"+groupLinkedList.get(i)+"\t"+categoriesLinkedList.get(i);
         myBufferedWriter.write(stringToBeWritten);
         myBufferedWriter.newLine();
      }

      myBufferedReader.close();
      myBufferedWriter.close();
   }
}