using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DoThaInclude
{
    class Program
    {
        static void Main(string[] args)
        {
            var folderToLook = "../../../../../";
            if (args.Length > 0)
                folderToLook = args[0];

            var files = Directory.GetFiles(folderToLook);
            foreach (var file in files)
            {
                Console.WriteLine("Handling file " + file);
                if (file.EndsWith(".frag") && !file.Contains("generated"))
                {
                    var regexInclude = new Regex(@"^\s*\#include\s+["" <]([^"">]+)*["" >]");
                    var currentCodeFile = File.ReadAllText(file);
                    StringBuilder outputFile = new StringBuilder();
                    bool hasToGenerate = false;
                    var lines = currentCodeFile.Split(new string[] { "\n", "\n\r" }, StringSplitOptions.None);
                    var origPath = System.IO.Path.GetDirectoryName(file);
                    foreach (var line in lines)
                    {
                        var matchRes = regexInclude.Match(line);
                        if (matchRes.Success)
                        {
                            hasToGenerate = true;
                            var includeFile = matchRes.Groups[1].Value;
                            outputFile.AppendLine(File.ReadAllText(System.IO.Path.Combine(origPath, includeFile)));
                        }
                        else
                            outputFile.Append(line);
                    }
                    var noExtOrigFileName = System.IO.Path.GetFileNameWithoutExtension(file);
                    if (hasToGenerate)
                    {
                        Console.WriteLine("=> Outputing " + noExtOrigFileName + ".generated.frag");
                        var outputCode = outputFile.ToString();
                        outputCode = outputCode.Replace("\r\n", "\n").Replace("\r", "\n").Replace("\r", "\n").Replace("\n", "\r\n");
                        File.WriteAllText(System.IO.Path.Combine(origPath, noExtOrigFileName + ".generated.frag"), outputCode);
                    }

                }
            }
        }
    }
}
