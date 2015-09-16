import java.io.*;
import java.util.*;

public class ProductCategoryBuilder{

   public static void main(String args[])throws IOException{

      File inputFile = new File("Project2Data.txt");
      File outputFile = new File("ProductCategory.txt");

      outputFile.createNewFile();

      BufferedReader myBufferedReader = new BufferedReader(new java.io.FileReader(inputFile));
      BufferedWriter myBufferedWriter = new BufferedWriter(new FileWriter(outputFile));
      String currentLine;
      String stringToBeWritten="";
      LinkedList idLinkedList = new LinkedList();
      LinkedList categoriesLinkedList = new LinkedList();
      LinkedList<String> categoryNameIdLinkedList = new LinkedList<String>();
      HashMap<String,String> idCategoryHashMap = new HashMap<String,String>();
      String currentId="";

      while((currentLine = myBufferedReader.readLine())!=null) {

         
         if(currentLine.contains("Id:")) {
            currentId = currentLine.substring(currentLine.lastIndexOf(" "));
            //myBufferedWriter.newLine();
            //myBufferedWriter.write(currentId);
         }

         /*if(currentLine.contains("categories:")) {
            String currentCategories = currentLine.substring(currentLine.lastIndexOf(" ")+1);
            categoriesLinkedList.add(currentCategories);
            /*String loopCount = (String)categoriesLinkedList.get(categoriesLinkedList.size()-1);
            System.out.println(loopCount);*/
         //}*/

         if(currentLine.contains("|")) {
            StringTokenizer myTokenizer = new StringTokenizer(currentLine,"|");
            String currentIdCategories = "";
            String resultantString = " ";
            while(myTokenizer.hasMoreElements()) {
               currentIdCategories += myTokenizer.nextElement().toString();
            }
            for(int k=0;k<currentIdCategories.length();k++) {
               if(currentIdCategories.charAt(k) == '[') {
                  int count = k+1;
                  while(currentIdCategories.charAt(count) != ']') {
                     resultantString += currentIdCategories.charAt(count);
                     count++;
                  }
                  resultantString += " ";
               }
            }
            String[] categoriesId = resultantString.split(" ");
            for(int i=1;i<categoriesId.length;i++) {
               myBufferedWriter.write(currentId +"\t"+ categoriesId[i]);
               myBufferedWriter.newLine();
            }
            
            /*String[] bothIds = resultantString.split(" ");
            
            System.out.println(bothIds[1]);*/
            //=====myBufferedWriter.write(resultantString.toString());
            //myBufferedWriter.write(currentIdCategories.toString());

            /*myBufferedWriter.write(currentIdCategories.toString());*/
         }
      }

      /*for(int i = 0; i < idLinkedList.size();i++) {
         System.out.println(""+idLinkedList.get(i)+"  "+categoriesLinkedList.get(i));
      }*/


      myBufferedReader.close();
      myBufferedWriter.close();
   }
}