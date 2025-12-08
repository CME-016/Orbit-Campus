$ErrorActionPreference = 'Stop'

$mdPath = Join-Path (Get-Location) 'campus-sphere-documentation.md'
$docxPath = Join-Path (Get-Location) 'campus-sphere-documentation.docx'

if (-not (Test-Path $mdPath)) { throw "Markdown file not found: $mdPath" }
$text = Get-Content -Raw $mdPath

$word = New-Object -ComObject 'Word.Application'
$word.Visible = $false
try {
  $doc = $word.Documents.Add()
  $range = $doc.Range(0,0)
  $range.Text = $text

  # Apply heading styles by regex patterns
  foreach ($p in $doc.Paragraphs) {
    $t = ($p.Range.Text).Trim()
    if ([string]::IsNullOrWhiteSpace($t)) { continue }
    if ($t -match '^(Title Page|Declaration|Certificate|Acknowledgment|Abstract|Table of Contents|List of Figures and Tables)$') { $p.Range.Style = 'Heading 1'; continue }
    if ($t -match '^\d+\.\d+\.\d+\s') { $p.Range.Style = 'Heading 3'; continue }
    if ($t -match '^\d+\.\d+\s') { $p.Range.Style = 'Heading 2'; continue }
    if ($t -match '^\d+\.\s') { $p.Range.Style = 'Heading 1'; continue }
  }

  # Insert page breaks before major sections
  $majors = @('Declaration','Certificate','Acknowledgment','Abstract','Table of Contents','List of Figures and Tables','1. Introduction','2. System Analysis','3. System Design','4. Implementation','5. Testing and Results','6. Conclusion and Future Work','7. References','Appendix')
  foreach ($m in $majors) {
    $word.Selection.HomeKey(6) | Out-Null # wdStory
    $find = $word.Selection.Find
    $find.ClearFormatting()
    $find.Text = $m
    if ($find.Execute()) {
      $word.Selection.HomeKey(5) | Out-Null # wdLine
      $word.Selection.InsertBreak(7) | Out-Null # wdPageBreak
    }
  }

  # Insert TOC after 'Table of Contents'
  $word.Selection.HomeKey(6) | Out-Null
  $find = $word.Selection.Find
  $find.ClearFormatting(); $find.Text = 'Table of Contents'
  if ($find.Execute()) {
    $word.Selection.MoveDown(5,1) | Out-Null # wdLine
    $tocRange = $word.Selection.Range
    $doc.TablesOfContents.Add($tocRange,$true,1,3) | Out-Null
  }

  # Add page numbers
  foreach ($sec in $doc.Sections) { $sec.Footers.Item(1).PageNumbers.Add() | Out-Null }

  # Basic formatting: Times New Roman 12pt, 1.5 spacing, 1-inch margins
  $doc.Content.Font.Name = 'Times New Roman'
  $doc.Content.Font.Size = 12
  $doc.Content.ParagraphFormat.LineSpacingRule = 1 # wdLineSpaceSingle
  $doc.Content.ParagraphFormat.SpaceAfter = 12
  $doc.PageSetup.TopMargin = $word.InchesToPoints(1)
  $doc.PageSetup.BottomMargin = $word.InchesToPoints(1)
  $doc.PageSetup.LeftMargin = $word.InchesToPoints(1)
  $doc.PageSetup.RightMargin = $word.InchesToPoints(1)

  $doc.SaveAs($docxPath, 16)
  $doc.Close()
}
finally {
  $word.Quit()
}

Write-Host "Generated: $docxPath"


