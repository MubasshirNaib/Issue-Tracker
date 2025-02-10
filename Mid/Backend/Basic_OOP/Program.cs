// See https://aka.ms/new-console-template for more information
using System.Runtime.InteropServices;

class A
{
    public string Name;

}
class B: A
{
    public string Department;
    
}
class C : B
{
    public int Batch;
    public C()
    {
        Console.WriteLine("Implementing Multilevel Inheritance using class");
        Name = "Mubasshir Naib";
        Department = "CSE";
    }
    public void Display()
    {
        Console.WriteLine($"Name:{Name}");
        Console.WriteLine(Department);
        Console.WriteLine(Batch);
    }
}
interface IA
{
    void Person_Name(string name);
}
interface IB
{
    void Person_Department(string department);
}
interface IC
{
    void Person_Batch(int id);
}
class Data : IA, IB, IC
{
    public Data()
    {
        Console.WriteLine("Implementing Multiple Inheritance using Interface.");
    }
    public void Person_Name(string name) { 
        Console.WriteLine(name);
    }
    public void Person_Department(string department) {
        Console.WriteLine(department);
    }
    public void Person_Batch(int id)
    {
        Console.WriteLine(id);
    }
}
class Basic__OOP
{
    public static void Main(string[] args)
    {
       // Console.WriteLine("Mubasshir");
        C person= new C();
        person.Batch = 19;
        person.Display();

        Data data = new Data();
        IA k = data;
        k.Person_Name("Mubasshir Naib");
        data.Person_Department("CSE");
        data.Person_Batch(19);
    }
}