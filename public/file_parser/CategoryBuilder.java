import java.io.*;
import java.util.*;

public class CategoryBuilder{

   public static void main(String args[])throws IOException{

      File inputFile = new File("Project2Data.txt");
      File outputFile = new File("Category.txt");

      outputFile.createNewFile();

      BufferedReader myBufferedReader = new BufferedReader(new java.io.FileReader(inputFile));
      BufferedWriter myBufferedWriter = new BufferedWriter(new FileWriter(outputFile));
      String currentLine;
      String stringToBeWritten="";
      HashMap<String,String> categoryNameIdHashMap = new HashMap<String,String>();
      LinkedList<String> categoryNameIdLinkedList = new LinkedList<String>();
      
      while((currentLine = myBufferedReader.readLine())!=null) {
         
         if(currentLine.contains("|")) {
            StringTokenizer myTokenizer = new StringTokenizer(currentLine,"|");
            while(myTokenizer.hasMoreElements()) {
               categoryNameIdLinkedList.add(myTokenizer.nextElement().toString());
            }
         }
      }

      for(int i=0;i<categoryNameIdLinkedList.size();i++){
         String stringToBeEdited = categoryNameIdLinkedList.get(i).toString();
         if (stringToBeEdited.charAt(0) == '[' ) {
            categoryNameIdLinkedList.remove(stringToBeEdited);
         }
         else {
            int openingIndex = stringToBeEdited.indexOf('[');
            if(openingIndex!=-1) {
               String myKey = stringToBeEdited.substring(0,openingIndex);
               String myValue = stringToBeEdited.substring(openingIndex+1,stringToBeEdited.length()-1);
               if(categoryNameIdHashMap.containsKey(myKey) && categoryNameIdHashMap.containsValue(myValue)) {
                  System.out.println("Already present!");
               }
               else {
                  categoryNameIdHashMap.put(myKey,myValue);
               }
               //System.out.println(""+string1+" "+string2);
               //categoryNameIdHashMap.add();
            }
         }

      }

      /*for(int i=0;i<categoryNameIdLinkedList.size();i++){
         System.out.println(""+categoryNameIdLinkedList.get(i));
      }*/

      Set categoryNameIdSet = categoryNameIdHashMap.entrySet();
      Iterator i = categoryNameIdSet.iterator();

      while(i.hasNext()) {
         Map.Entry mapEntry = (Map.Entry)i.next();
         stringToBeWritten = mapEntry.getKey()+"\t"+mapEntry.getValue();
         myBufferedWriter.write(stringToBeWritten);
         myBufferedWriter.newLine();
      }

      /*for(int i=0; i<categoryIdLinkedList.size();i++) {
         stringToBeWritten = ""+categoryIdLinkedList.get(i);
         myBufferedWriter.write(stringToBeWritten);
         myBufferedWriter.newLine();
      }*/

      myBufferedReader.close();
      myBufferedWriter.close();
   }
}