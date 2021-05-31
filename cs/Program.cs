using System;
using System.IO;
using System.Text;

class Test
{

    public static void Main()
    {
        bool next = true; 
        int k = -1;
        // string str = "Gaston";
        byte[] encrypted = File.ReadAllBytes(@"encrypted.pdf");
        byte[] decrypted = File.ReadAllBytes(@"encrypted.pdf");
        while(next == true) {
            k++;
            Console.Clear();
            for (int i = 0; i < encrypted.Length; i++)
            {
                decrypted[i] = (byte)(encrypted[i]+k+i);
                if (decrypted[i] < 128){

                Console.Write(Convert.ToChar(decrypted[i]));
                } else {
                    Console.Write(" ");
                }
            }
            Console.WriteLine("k constant: {0}",k);
            Console.WriteLine("Que desea hacer?");
            Console.ReadLine();
        }
        
        
    }
}